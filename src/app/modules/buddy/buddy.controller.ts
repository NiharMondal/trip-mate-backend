import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { buddyServices } from "./buddy.services";
import sendResponse from "../../utils/sendResponse";


//create trip
const insertIntoDB = asyncHandler(async(req:Request, res:Response)=>{

    const result = await buddyServices.insertIntoDB(req.body);


    sendResponse(res, {
        statusCode:201,
        message: "Data created successfully",
        result: result
    })
});


//get all trip
const getAllFromDB = asyncHandler(async(req:Request, res:Response)=>{

    const result = await buddyServices.getAllFromDB();


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//get single data by slug
const getBySlug = asyncHandler(async(req:Request, res:Response)=>{
    const {slug} = req.params;
    const result = await buddyServices.getBySlug(slug);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//update single data by id
const deleteFromDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await buddyServices.deleteFromDB(id);


    sendResponse(res, {
        statusCode:200,
        message: "Data deleted successfully",
        result: result
    })
});


const updateIntoDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await buddyServices.updateIntoDB(id, req.body);


    sendResponse(res, {
        statusCode:200,
        message: "Data updated successfully",
        result: result
    })
});
export const buddyController = {
    insertIntoDB,
    getAllFromDB,
    getBySlug,
    deleteFromDB,
    updateIntoDB
}