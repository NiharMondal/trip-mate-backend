import Destination from "../destination/destination.model";
import User from "../user/user.model";
import { ITrip } from "./trip.interface";
import Trip from "./trip.model";
import CustomError from "../../utils/CustomeError";
import { generateSlug } from "../../helpers/createSlug";
import QueryBuilder from "../../helpers/QueryBuilder";
import mongoose from "mongoose";

//admin or user
const insertIntoDB = async (payload: ITrip) => {
	//checking destination
	const destination = await Destination.findOne({
		slug: payload.destination,
	});

	if (!destination) {
		throw new CustomError(404, "Destination is not defined");
	}

	//checking user
	const user = await User.findById(payload.user);
	if (!user) {
		throw new CustomError(401, "User ID is not valid");
	}

	//generating slug
	const slug = generateSlug(payload.title);

	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		//creating trip
		const res = await Trip.create(
			[{ ...payload, slug, availAbleSeats: payload.maxGuests }],
			{ session }
		);

		// inserting trip _id to destination collection
		await Destination.findOneAndUpdate(
			{ slug: payload.destination },
			{ $push: { trips: res[0]._id } },
			{ session }
		);
		await session.commitTransaction();
		await session.endSession();
		return res[0];
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw new CustomError(400, "Something went wrong");
	}
};

// get all trip --> public
const getAllFromDB = async (query: Record<string, string | unknown>) => {
	
	const data = new QueryBuilder(
		Trip.find()
			.populate("user", "name -_id")
			.populate({
				path: "reviews",
				select: "rating message userId",
				populate: {
					path: "userId",
					select: "name",
				},
			}),
		query
	)
		.search(["title", "destination"])
		.filter()
		.budget()
		.pagination()
		.sort()

	const res = await data.queryModel;
	const metaData = await data.countTotal();

	return {
		res,
		metaData,
	};
};

//find by slug --> public
const getBySlug = async (slug: string) => {
	const res = await Trip.findOneAndUpdate(
		{ slug: slug },
		{ $inc: { visitors: 1 } }, //increase visitor field when user click to see details
		{ new: true }
	);
	return res;
};

//soft delete --> admin/user
const deleteFromDB = async (id: string) => {
	const res = await Trip.findByIdAndUpdate(id, {
		isDeleted: true,
	});
	return res;
};

//update by ID --> admin/user
const updateIntoDB = async (id: string, payload: Partial<ITrip>) => {
	const res = await Trip.findByIdAndUpdate(
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

// get trip by user --> user
const getMyTrips = async (userId: string) => {
	const res = await Trip.find({
		user: userId,
	})
		.populate({
			path: "buddyRequest",
			select: "people status totalCost",
			populate: { path: "buddy", select: "name email" },
		})
		.select("title from destination availableSeats");

	return res;
};

//freshly added -> public
const freshlyAdded = async () => {
	const res = await Trip.find({}).limit(9).sort({ createdAt: "desc" });

	return res;
};

// public
const popularTrip = async () => {
	const res = await Trip.find({
		$or: [{ visitors: { $gte: 3 } }, { rating: { $gt: 3 } }],
	});
	return res;
};
export const tripServices = {
	insertIntoDB,
	getAllFromDB,
	getBySlug,
	deleteFromDB,
	updateIntoDB,

	//extra services
	freshlyAdded,
	getMyTrips,
	popularTrip,
};
