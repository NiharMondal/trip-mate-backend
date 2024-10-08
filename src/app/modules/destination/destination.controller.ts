import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

import sendResponse from "../../utils/sendResponse";
import { destinationServices } from "./destination.services";


//create trip
const insertIntoDB = asyncHandler(async(req:Request, res:Response)=>{

    const result = await destinationServices.insertIntoDB(req.body);


    sendResponse(res, {
        statusCode:201,
        message: "Data created successfully",
        result: result
    })
});


//get all trip
const getAllFromDB = asyncHandler(async(req:Request, res:Response)=>{

    const result = await destinationServices.getAllFromDB();


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//get single data by id
const getById = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await destinationServices.getById(id);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//update single data by id
const deleteFromDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await destinationServices.deleteFromDB(id);


    sendResponse(res, {
        statusCode:200,
        message: "Data deleted successfully",
        result: result
    })
});


const updateIntoDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await destinationServices.updateIntoDB(id, req.body);


    sendResponse(res, {
        statusCode:200,
        message: "Data updated successfully",
        result: result
    })
});


export const destinationController = {
    insertIntoDB,
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB,
    
}