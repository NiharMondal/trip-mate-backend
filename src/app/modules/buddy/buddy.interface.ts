import { Schema } from "mongoose";


export interface IBuddyRequest {
    userId: Schema.Types.ObjectId;
    tripId: Schema.Types.ObjectId;
    needSeats: number;
   
}