import mongoose from "mongoose";
import CustomError from "../../utils/CustomeError";
import Trip from "../trip/trip.model";
import { IBuddyRequest } from "./buddy.interface";
import Buddy from "./buddy.model";

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

//get incomming requests for the user's trip's
const getIncommingRequests = async (userId: string) => {
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

//approve or reject a request
const updateRequestStatus = async (
	requestId: string,
	payload: { status: string; userId: string }
) => {
	const buddyRequest = await Buddy.findOne({
		_id: requestId,
		buddy: payload.userId,
	});

	if (!buddyRequest) {
		throw new CustomError(404, "Requested trip mate not found!");
	}

	const res = await Buddy.findByIdAndUpdate(
		requestId,
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
