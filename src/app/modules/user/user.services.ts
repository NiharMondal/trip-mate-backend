import CustomError from "../../utils/CustomeError";
import Buddy from "../buddy/buddy.model";
import Trip from "../trip/trip.model";
import { IUser } from "./user.interface";
import User from "./user.model";

//admin
const getAllFromDB = async () => {
	const res = await User.find().select("-password -__v");
	return res;
};

//find by id
const getById = async (id: string) => {
	const res = await User.findById(id).select("name email avatar");
	return res;
};

//delete by ID
const deleteFromDB = async (id: string) => {
	const res = await User.findByIdAndDelete(id);
	return res;
};

const updateIntoDB = async (id: string, payload: Partial<IUser>) => {
	const res = await User.findByIdAndUpdate(
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

const getOutGoingRequest = async (userId: string) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new CustomError(404, "User not found!");
	}

	const res = await Buddy.find({ buddy: userId })
		.populate({
			path: "trip",
			select: "title startDate endDate",
			populate: {
				path: "user",
				select: "name email",
			},
		})
		.select("_id status totalCost");

	return res;
};

//get incomming requests for the all trips 
const getIncommingRequests = async (userId: string) => {
	const user = await Trip.findOne({ user: userId });
	if (!user) {
		throw new CustomError(404, "User not found!");
	}
	const res = await Trip.find({ user: userId })
		.populate({
			path: "buddyRequest",
			select: "people status totalCost",
			populate: {
				path: "buddy",
				select: "name",
			},
		})
		.select("title startDate endDate availAbleSeats");

	return res;
};

export const userServices = {
	getAllFromDB,
	getById,
	deleteFromDB,
	updateIntoDB,
	getOutGoingRequest,
	getIncommingRequests,
};
