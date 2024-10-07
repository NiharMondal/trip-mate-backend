import { createSlug } from "../../../helpers/createSlug";
import User from "../user/user.model";
import { ITrip } from "./trip.interface";
import Trip from "./trip.model";


//admin or user
const insertIntoDB = async(payload: ITrip)=>{
    //create slug
    const slug = createSlug(payload.title)

    //create doc
    const res = await Trip.create({
        ...payload,
        slug
    });

    await User.findByIdAndUpdate({_id: res.user},{$push:{trips: res._id}})

    return res;
};


// admin
const getAllFromDB = async()=>{

    const res = await Trip.find().populate("user","name email").populate("buddyRequest");
    return res;
}

//find by slug --> admin/user
const getBySlug = async(slug: string)=>{

    const res = await Trip.findOne({
        slug
    });
    return res;
}


//delete by ID --> admin/user
const deleteFromDB = async(id: string)=>{

    const res = await Trip.findByIdAndDelete(id)
    return res;
}


//update by ID --> admin/user
const updateIntoDB = async(id:string, payload: Partial<ITrip>)=>{
    const res = await Trip.findByIdAndUpdate(id, {$set:{
        ...payload
    }},{new:true});

    return res;
}


// get trip by user --> user
const getMyTrips = async(userId: string)=>{

    const res = await Trip.find({
        user: userId
    }).populate({path:"buddyRequest",select:"people status totalCost", populate:{path:"buddy", select:"name email"}}).select("title from destination availableSeats")


    return res;
}

export const tripServices = {
    insertIntoDB,
    getAllFromDB,
    getBySlug,
    deleteFromDB,
    updateIntoDB,
    getMyTrips
}