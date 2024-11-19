import mongoose from "mongoose";
import QueryBuilder from "../../helpers/QueryBuilder";
import CustomError from "../../utils/CustomeError";
import Trip from "../trip/trip.model";
import User from "../user/user.model";
import { IReviw } from "./review.interface";
import Review from "./review.model";

const insertIntoDB = async (payload: IReviw) => {
	//checking user exist
	const checkUser = await User.findById(payload.userId);

	if (!checkUser) {
		throw new CustomError(404, "User is not found!");
	}

	//checking trip exist
	const checkTrip = await Trip.findById(payload.tripId);

	if (!checkTrip) {
		throw new CustomError(404, "Trip is not found!");
	}
	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// step 1: first transaction
		const res = await Review.create([{ ...payload }], { session });
		console.log({ res });
		// step 2: calculate the new average rating
		const reviews = await Review.find({ tripId: res[0].tripId });

		const totalRatings = reviews.reduce(
			(sum, review) => sum + review.rating,
			0
		);
		const avgRating = totalRatings / reviews.length + 1;

		console.log({ avgRating });
		// step 3: second trasnaction
		await Trip.findOneAndUpdate(
			res[0].tripId,
			{ $push: { reviews: res[0]._id } },
			{ session }
		);

		await session.commitTransaction();
		await session.endSession();
		return res[0];
	} catch (error: any) {
		await session.abortTransaction();
		await session.endSession();
		console.log(error.message);
		throw new CustomError(500, "Something went wrong!");
	}
};

const getAllFromDB = async (query: Record<string, string | unknown>) => {
	const data = new QueryBuilder(Review.find(), query);

	const res = await data.queryModel;
	return res;
};

//find by id --> user
const getBySlug = async (id: string) => {
	const res = await Review.findOne({
		id,
	});
	return res;
};

//soft delete --> admin/user
const deleteFromDB = async (id: string) => {
	const res = await Review.findByIdAndUpdate(id, {
		isDeleted: true,
	});
	return res;
};

//update by ID --> admin/user
const updateIntoDB = async (id: string, payload: Partial<IReviw>) => {
	const res = await Review.findByIdAndUpdate(
		id,
		{
			$set: {
				...payload,
			},
		},
		{ new: true }
	);

	return res;
};

export const reviewServices = {
	insertIntoDB,
	getAllFromDB,
	getBySlug,
	deleteFromDB,
	updateIntoDB,
};
