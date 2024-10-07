import { model, Schema } from "mongoose";
import { ITrip } from "./trip.interface";



const tripSchema = new Schema<ITrip>({

    title: {
        type: String,
        required: [true, "Title is required"],
        unique:true
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
    availAbleSeats:{
        type: Number,
        default: 20,
    },
    startDate:{
        type:  String,
        required:[true, "Start date is required"]
    },
    endDate: {
        type:  String,
        required: [true, "End date required"],
    },
    slug: {
        type: String,
    },
    details: {
        type: String,
        required: [true, "End date required"],
    },
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    buddyRequest:[{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Buddy"
    }]

},{timestamps:true});


const Trip =  model<ITrip>("Trip", tripSchema);

export default Trip;

