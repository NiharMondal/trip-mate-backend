import { Types } from "mongoose";
export const Status = ["PENDING", "ACCEPTED","BLOCKED"]

export interface IBuddyRequest {
    trip: Types.ObjectId;
    buddy: Types.ObjectId;
    people: number;
    status: "PENDING" | "ACCEPTED" | "BLOCKED";
    totalCost: number;
}