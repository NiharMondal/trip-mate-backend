
import { IUser } from "./user.interface";
import User from "./user.model";



//admin
const getAllFromDB = async()=>{
    const res = await User.find().select("-password -__v")
    return res;
}

//find by id
const getById = async(id: string)=>{

    const res = await User.findById(id).select("name email avatar")
    return res;
}


//delete by ID
const deleteFromDB = async(id: string)=>{

    const res = await User.findByIdAndDelete(id)
    return res;
}



const updateIntoDB = async(id:string, payload: Partial<IUser>)=>{
    const res = await User.findByIdAndUpdate(id, {$set:{
        ...payload
    }},{new:true});

    return res;
}


const outGoingRequest = async(id:string)=>{
    const res = await User.findById(id).populate("buddyRequest").select("buddyRequest");

    return res;
}


export const userServices = {
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB,
    outGoingRequest
}