import { Types } from "mongoose";

export const ROLE = ["user", "admin"]


export interface IUser {
    name: string;
    email:string;
    role:string;
    avatar: string;
    
    password:string;
    isDeleted: boolean;
    trips: Types.ObjectId;
    
}