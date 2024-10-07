
import Trip from "../trip/trip.model";
import User from "../user/user.model";
import { IBuddyRequest } from "./buddy.interface";
import Buddy from "./buddy.model";


const insertIntoDB = async(payload: IBuddyRequest)=>{
    //create doc
    const res = await Buddy.create(payload)

    await User.findByIdAndUpdate({_id: res.buddy},{$push:{buddyRequest: res._id}});
    await Trip.findByIdAndUpdate({_id: res.trip},{$push:{buddyRequest: res._id}});
    return res;
};

//admin
const getAllFromDB = async()=>{

    const res = await Buddy.find()
    return res;
}

//find buddy request using userId -> user/admin

const getById = async(id: string)=>{

    const res = await Buddy.findOne({tripId:id}).populate('buddy');
    return res;
}


//delete by ID
const deleteFromDB = async(id: string)=>{

    const res = await Buddy.findByIdAndDelete(id)
    return res;
}



const updateIntoDB = async(id:string, payload: Partial<IBuddyRequest>)=>{
    const res = await Buddy.findByIdAndUpdate(id, {$set:{
        ...payload
    }},{new:true});

    return res;
}



export const buddyServices = {
    insertIntoDB,
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB
}