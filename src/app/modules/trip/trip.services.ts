import Destination from "../destination/destination.model";
import User from "../user/user.model";
import { ITrip } from "./trip.interface";
import Trip from "./trip.model";
import CustomError from "../../utils/CustomeError";
import { generateSlug } from "../../../helpers/createSlug";

//admin or user
const insertIntoDB = async (payload: ITrip) => {
	//checking destination
	const destination = await Destination.findOne({
		destination: payload.destination,
	});

	if (!destination) {
		throw new CustomError(404, "Destination is not defined");
	}

	//checking user
	const user = await User.findById(payload.user);
	if (!user) {
		throw new CustomError(404, "User ID is not valid");
	}

	//generating slug
	const slug = generateSlug(payload.title);

	//creating trip
	const res = await Trip.create({ ...payload, slug });

	// inserting trip _id to destination collection
	await Destination.findOneAndUpdate(
		{ destination: payload.destination },
		{ $push: { trips: res._id } }
	);
	
	return res;
};

// public
const getAllFromDB = async () => {
	const res = await Trip.find().populate("user", "name email");

	return res;
};

//find by slug --> public
const getBySlug = async (slug: string) => {
	const res = await Trip.findOne({
		slug,
	});
	return res;
};

//delete by ID --> admin/user
const deleteFromDB = async (id: string) => {
	const res = await Trip.findByIdAndDelete(id);
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

export const tripServices = {
	insertIntoDB,
	getAllFromDB,
	getBySlug,
	deleteFromDB,
	updateIntoDB,
	getMyTrips,
};
