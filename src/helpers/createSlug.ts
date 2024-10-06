import slugify from "slugify"
import { ITokenPayload } from "../app/modules/auth/auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig } from "../config";
export const createSlug = (payload:string)=>{

    const slug = slugify(payload, {lower:true,trim:true});
    return slug;

};


export const generateToken = (payload: JwtPayload)=>{
    const token =  jwt.sign(payload, envConfig.jwt_secret as string);
    return token
}