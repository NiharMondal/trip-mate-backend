import { Types } from "mongoose";

export interface IDestination {
    destination: string;
    slug: string;
    trips: Types.ObjectId;
    shortInfo: string
}