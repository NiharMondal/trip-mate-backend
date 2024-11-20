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
	session.startTransaction();
	try {
		// step 1: first transaction ---> create review
		const newReview = await Review.create([payload], { session });

		// step 2: second transaction ----> find review
		const reviews = await Review.find(
			{ tripId: newReview[0].tripId },
			null,
			{
				session,
			}
		);

		// step 3: calculate the new average rating
		const totalRating = reviews.reduce(
			(sum, review) => sum + review?.rating,
			0
		);
		const averageRating = Math.round(totalRating / reviews.length);

		// step 4: third transaction --->  Update the trip's rating
		await Trip.findByIdAndUpdate(
			newReview[0].tripId,
			{ rating: averageRating, $push: { reviews: newReview[0]._id } },
			{ new: true, session }
		);

		await session.commitTransaction();
		await session.endSession();
		return newReview[0];
	} catch (error: any) {
		await session.abortTransaction();
		await session.endSession();
		
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
