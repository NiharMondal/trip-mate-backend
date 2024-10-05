import { createSlug } from "../../../helpers/createSlug";
import { ITrip } from "./trip.interface";
import Trip from "./trip.model";

const insertIntoDB = async(payload: ITrip)=>{
    //create slug
    const slug = createSlug(payload.title)

    //create doc
    const res = await Trip.create({
        ...payload,
        slug
    })

    return res;
};

const getAllFromDB = async()=>{

    const res = await Trip.find();
    return res;
}

//find by slug
const getBySlug = async(slug: string)=>{

    const res = await Trip.findOne({
        slug
    });
    return res;
}


//delete by ID
const deleteFromDB = async(id: string)=>{

    const res = await Trip.findByIdAndDelete(id)
    return res;
}



const updateIntoDB = async(id:string, payload: Partial<ITrip>)=>{
    const res = await Trip.findByIdAndUpdate(id, {$set:{
        ...payload
    }},{new:true});

    return res;
}



export const tripServices = {
    insertIntoDB,
    getAllFromDB,
    getBySlug,
    deleteFromDB,
    updateIntoDB
}