import { Types } from "mongoose";


export interface IReviw {
    message: string;
    rating:number;
    userId: Types.ObjectId;
    tripId: Types.ObjectId;
}