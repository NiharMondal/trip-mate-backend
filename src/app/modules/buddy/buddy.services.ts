import mongoose from "mongoose";
import CustomError from "../../utils/CustomeError";
import Trip from "../trip/trip.model";
import { IBuddyRequest } from "./buddy.interface";
import Buddy from "./buddy.model";
import User from "../user/user.model";

//make a request to join
const requestToJoin = async (payload: IBuddyRequest) => {
	const tripExist = await Trip.findById(payload.trip);

	if (!tripExist) {
		throw new CustomError(404, "Trip not found!");
	}
	if (tripExist.availAbleSeats < payload.people) {
		throw new CustomError(400, "There is no sufficent seats!");
	}
	//start session
	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		//first transaction => create request
		const res = await Buddy.create([payload], { session });

		//second transaction to trip collection
		await Trip.findByIdAndUpdate(
			res[0].trip,
			{
				$push: { buddyRequest: res[0]._id },
				$inc: { availAbleSeats: -payload.people },
			},
			{ session }
		);

		await session.commitTransaction();
		await session.endSession();
		return res;
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();

		throw new CustomError(400, "Something went wrong!");
	}
};

// get outgoing requests (tours the user has requested to join)
const getOutgoingRequests = async (userId: string) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new CustomError(404, "User not found!");
	}
	const res = await Buddy.find({ user: userId })
		.populate({
			path: "trip",
			select: "user title startDate",
			populate: {
				path: "user",
				select: "name",
			},
		})
		.select("_id status");

	return res;
};

//get incomming requests for the user's trip's
const getIncommingRequests = async (userId: string) => {
	const res = await Trip.find({ user: userId })
		.populate({
			path: "buddyRequest",
			select: "user people status totalCost",
			populate: {
				path: "user",
				select: "name",
			},
		})
		.select("title startDate endDate availAbleSeats");

	return res;
};

//approve or reject a request
const updateRequestStatus = async (
	id: string,
	payload: { status: string; userId: string }
) => {
	const buddyRequest = await Buddy.findOne({
		_id: id,
		user: payload.userId,
	});

	if (!buddyRequest) {
		throw new CustomError(404, "Buddy request not found!");
	}

	const res = await Buddy.findByIdAndUpdate(
		id,
		{
			$set: { status: payload.status },
		},
		{ new: true }
	);
	return res;
};

export const buddyServices = {
	requestToJoin,
	getOutgoingRequests,
	getIncommingRequests,
	updateRequestStatus,
};
