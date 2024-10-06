import { model, Schema } from "mongoose";
import { IBuddyRequest } from "./buddy.interface";

const buddySchema = new Schema<IBuddyRequest>({
    tripId :{
        type: Schema.ObjectId,
        required: true,
        ref: "Trip"
    },
    userId :{
        type: Schema.ObjectId,
        required: true,
        ref: "User"
    },
    needSeats:{
        type: Number,
        required: true,
    },
    
});



const Buddy = model<IBuddyRequest>("Buddy", buddySchema);

export default Buddy;