import { Types } from "mongoose";
import Buddy from "../buddy/buddy.model";
import Destination from "../destination/destination.model";
import Review from "../review/review.model";
import Trip from "../trip/trip.model";
import User from "../user/user.model";

const adminMetaData = async () => {
	const trips = await Trip.countDocuments();
	const users = await User.countDocuments();
	const buddies = await Buddy.countDocuments();
	const reviews = await Review.countDocuments();
	const destinations = await Destination.countDocuments();

	return {
		trips,
		users,
		buddies,
		reviews,
		destinations,
	};
};

const userMetaData = async (userId: string) => {
	const trips = (await Trip.find({ user: userId })).length;
	const reviews = (await Review.find({ userId })).length;
	const outgoing = (await Buddy.find({ user: userId })).length;
	const totalRequests = await Trip.aggregate([
		// Match trips created by the user
		{ $match: { user: new Types.ObjectId(userId) } },
		// Project to calculate the size of buddyRequest array
		{
			$project: {
				buddyRequestCount: { $size: "$buddyRequest" },
			},
		},
		// // Group and sum up the counts
		{
			$group: {
				_id: null,
				totalRequests: { $sum: "$buddyRequestCount" },
			},
		},
	]);
	const incoming = totalRequests[0]?.totalRequests || 0;
	return {
		trips,
		reviews,
		outgoing,
		incoming
	};
};
export const metaServices = { adminMetaData, userMetaData };
