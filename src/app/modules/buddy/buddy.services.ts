import CustomError from "../../utils/CustomeError";
import Trip from "../trip/trip.model";
import { IBuddyRequest } from "./buddy.interface";
import Buddy from "./buddy.model";

//make a request to join
const requestToJoin = async (payload: IBuddyRequest) => {
	//create doc
	const res = await Buddy.create(payload);

	await Trip.findByIdAndUpdate(res.trip, {
		$push: { buddyRequest: res._id },
	});
	return res;
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
	payload: { status: string, userId:string }
) => {
	const buddyRequest = await Buddy.findOne({ _id: requestId, buddy: payload.userId });

	if (!buddyRequest) {
		throw new CustomError(404, "Requested trip mate not found!");
	}

	const res = await Buddy.findByIdAndUpdate(requestId, {
		$set: { status: payload.status },
	},{new:true});
	return res;
};

export const buddyServices = {
	requestToJoin,
	getOutgoingRequests,
	getIncommingRequests,
	updateRequestStatus,
};
