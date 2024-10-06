import { Schema } from "mongoose";


export interface IRegisterUser {
    name:string;
    email: string;
    password:string;
}


export interface ITokenPayload{
    id: typeof Schema.ObjectId;
    email: string;
}