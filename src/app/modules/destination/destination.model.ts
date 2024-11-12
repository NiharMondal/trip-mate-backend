import { model, Schema } from "mongoose";
import { IDestination } from "./destination.interface";


const destinationSchema = new Schema<IDestination>(
	{
		destination: {
			type: String,
			required: true,
			unique: true,
		},
		shortInfo:{
			type: String,
			required:true
		},
		slug: {
			type: String,
		},
		trips: [
			{
				type: Schema.Types.ObjectId,
				ref: "Trip",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Destination = model<IDestination>("Destination", destinationSchema);

export default Destination;
