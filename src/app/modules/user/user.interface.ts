import { Types } from "mongoose";

export const ROLE = ["user", "admin"]


export interface IUser {
    name: string;
    email:string;
    role:string;
    avatar: string;
    profile?:{
        age: string;
        bio: string;
    },
    password:string;
    trips: Types.ObjectId;
    buddyRequest: Types.ObjectId;
}