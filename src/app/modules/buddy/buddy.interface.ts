import { Types } from "mongoose";
export const Status = ["PENDING", "ACCEPTED", "REJECTED"];

export interface IBuddyRequest {
	trip: Types.ObjectId;
	buddy: Types.ObjectId;
	people: number;
	status: "PENDING" | "ACCEPTED" | "REJECTED";
	totalCost: number;
}
