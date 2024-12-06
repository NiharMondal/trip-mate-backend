import Buddy from "../buddy/buddy.model";
import Destination from "../destination/destination.model";
import Review from "../review/review.model";
import Trip from "../trip/trip.model";
import User from "../user/user.model";

const adminMetaData = async () => {
	const tripCount = await Trip.countDocuments();
	const userCount = await User.countDocuments();
	const requestCount = await Buddy.countDocuments();
	const reviewCount = await Review.countDocuments();
	const desCount = await Destination.countDocuments();

	return {
		tripCount,
		userCount,
		requestCount,
		reviewCount,
		desCount,
	};
};

export const metaServices = { adminMetaData };
