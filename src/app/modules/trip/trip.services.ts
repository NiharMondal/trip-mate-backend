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
	//checking unique slug
	const trip = await Trip.findOne({ slug });

	if (trip) {
		throw new CustomError(400, "Title is alreay used for another trip");
	}
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
	const data = new QueryBuilder(Trip.find({ isDeleted: false }), query)
		.search(["title", "destination"])
		.filter()
		.budget()
		.pagination()
		.sort();

	const res = await data.queryModel;
	const metaData = await data.countTotal();

	return {
		res,
		metaData,
	};
};

//find by slug --> public
const getBySlug = async (slug: string) => {
	await Trip.findOneAndUpdate(
		{ slug: slug },
		{ $inc: { visitors: 1 } }, //increase visitor field when user click to see details
		{ new: true }
	);
	const res = await Trip.findOne({ slug, isDeleted: false })
		.populate("user", "name -_id")
		.populate({
			path: "reviews",
			select: "rating comment userId",
			populate: {
				path: "userId",
				select: "name avatar email",
			},
		});
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
		isDeleted: false,
	}).select("title destination startDate endDate budget availAbleSeats");

	return res;
};

//freshly added -> public
const freshlyAdded = async () => {
	const res = await Trip.find({ isDeleted: false })
		.select("title rating budget photo slug reviews")
		.limit(9)
		.sort({ createdAt: "desc" });

	return res;
};

// public
const popularTrip = async () => {
	const res = await Trip.find({isDeleted:false})
		.sort({ rating: -1, visitors: -1 })
		.select("title rating budget photo slug reviews")
		.limit(6);
	return res;
};

// public

const relatedTrip = async (id: string) => {
	const currentTrip = await Trip.findById(id);

	if (!currentTrip) {
		throw new CustomError(404, "Trip not found!");
	}

	const minPrice = currentTrip.budget * 0.2;
	const maxPrice = currentTrip.budget * 1.8;

	const minVisitors = currentTrip.visitors * 0.2;
	const maxVisitors = currentTrip.visitors * 1.8;

	const minRatings = currentTrip.visitors * 0.2;
	const maxRatings = currentTrip.visitors * 1.5;

	const res = await Trip.find({
		isDeleted: false,
		_id: { $not: { $eq: id } },
		$or: [
			{ budget: { $gte: minPrice, $lte: maxPrice } },
			{ visitors: { $gte: minVisitors, $lte: maxVisitors } },
			{ rating: { $gte: minRatings, $lte: maxRatings } },
		],
	}).limit(3);

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
	relatedTrip,
};
