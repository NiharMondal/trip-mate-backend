import { Types } from "mongoose";


export interface IReviw {
    comment: string;
    rating:number;
    userId: Types.ObjectId;
    tripId: Types.ObjectId;
}