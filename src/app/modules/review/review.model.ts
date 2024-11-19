import { model, Schema } from "mongoose";
import { IReviw } from "./review.interface";



const reviewSchema = new Schema<IReviw>(
	{
		message: {
			type: String,
			required: [true, "Review message is required"],
		},
		rating: {
			type: Number,
			default: 0,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: [true, "User ID is required"],
			ref:"User"
		},
		tripId: {
			type: Schema.Types.ObjectId,
			required: [true, "Trip ID is required"],
		},
	},
	{ timestamps: true }
);

const Review = model<IReviw>("Review", reviewSchema);

export default Review;
