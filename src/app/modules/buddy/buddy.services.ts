import { createSlug } from "../../../helpers/createSlug";
import { IBuddyRequest } from "./buddy.interface";
import Buddy from "./buddy.model";


const insertIntoDB = async(payload: IBuddyRequest)=>{
    

    //create doc
    const res = await Buddy.create(payload)

    return res;
};

const getAllFromDB = async()=>{

    const res = await Buddy.find();
    return res;
}

//find by slug
const getBySlug = async(slug: string)=>{

    const res = await Buddy.findOne({
        slug
    });
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
    getBySlug,
    deleteFromDB,
    updateIntoDB
}