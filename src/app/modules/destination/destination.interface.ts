import { Types } from "mongoose";

export interface IDestination {
    thumbnail: string;
    destination: string;
    slug: string;
    visits: number;
    trips: Types.ObjectId;
    shortInfo: string
}