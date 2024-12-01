import { model, Schema } from "mongoose";
import { IBuddyRequest, Status } from "./buddy.interface";

const buddySchema = new Schema<IBuddyRequest>(
	{
		trip: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Trip",
		},

		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		people: {
			type: Number,
			default: 1,
		},
		status: {
			type: String,
			enum: Status,
			default: "PENDING",
		},
		totalCost: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Buddy = model<IBuddyRequest>("Buddy", buddySchema);

export default Buddy;
