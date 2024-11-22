import { Types } from "mongoose";

export interface ITrip {
    title: string;
    from: string;
    destination: string;
    photos: string[];
    maxGuests: number;
    availAbleSeats: number;
    visitors:number;
    rating: number;
    budget: number;
    slug: string;
    startDate: string;
    endDate: string;
    details: string;
    isDeleted: boolean
    user: Types.ObjectId;
    buddyRequest: Types.ObjectId;
    reviews: Types.ObjectId;
}