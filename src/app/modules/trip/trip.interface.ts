import { Types } from "mongoose";

export interface ITrip {
    title: string;
    from: string;
    destination: string;
    photos: string[];
    availAbleSeats: number;
    budget: number;
    slug: string;
    startDate: string;
    endDate: string;
    details: string;
    user: Types.ObjectId;
    buddyRequest: Types.ObjectId;
}