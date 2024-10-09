import { Types } from "mongoose";

export interface IDestination {
    destination: string;
    trips: Types.ObjectId;
}