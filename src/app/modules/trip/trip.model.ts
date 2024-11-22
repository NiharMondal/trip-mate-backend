import { model, Schema } from "mongoose";
import { ITrip } from "./trip.interface";

const tripSchema = new Schema<ITrip>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			unique: true,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		from: {
			type: String,
			required: [true, "Starting place is required"],
		},
		destination: {
			type: String,
			required: [true, "Destination is required"],
		},
		photos: {
			type: [String],
			required: [true, "Photo URL is required"],
		},
		maxGuests: {
			type: Number,
			default: 10,
		},
		availAbleSeats: {
			type: Number,
		},
		budget: {
			type: Number,
			required: true,
		},
		startDate: {
			type: String,
			required: [true, "Start date is required"],
		},
		endDate: {
			type: String,
			required: [true, "End date required"],
		},
		rating: {
			type: Number,
			default: 0,
		},

		details: {
			type: String,
			required: [true, "End date required"],
		},
		visitors: {
			type: Number,
			default: 0,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		buddyRequest: [
			{
				type: Schema.Types.ObjectId,
				ref: "Buddy",
			},
		],
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	{ timestamps: true }
);

const Trip = model<ITrip>("Trip", tripSchema);

export default Trip;
