import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";




//get all user
const getAllFromDB = asyncHandler(async(req:Request, res:Response)=>{

    const result = await userServices.getAllFromDB();


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//get single data by id
const getById = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await userServices.getById(id);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//delete single data by id
const deleteFromDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await userServices.deleteFromDB(id);


    sendResponse(res, {
        statusCode:200,
        message: "Data deleted successfully",
        result: result
    })
});


const updateIntoDB = asyncHandler(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await userServices.updateIntoDB(id, req.body);


    sendResponse(res, {
        statusCode:200,
        message: "Data updated successfully",
        result: result
    })
});


const outGoingRequest = asyncHandler(async(req:Request, res:Response)=>{
    const {userId} = req.params;
    const result = await userServices.outGoingRequest(userId);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});
export const userController = {
    
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB,
    outGoingRequest
}