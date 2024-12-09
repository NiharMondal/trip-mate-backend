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
    
    const result = await destinationServices.getAllFromDB(req.query);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});


//get single data by slug
const getBySlug = asyncHandler(async(req:Request, res:Response)=>{
    const {slug} = req.params;
    const result = await destinationServices.getBySlug(slug);


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


//get all trip
const getAllTripsByDestination = asyncHandler(async(req:Request, res:Response)=>{
    const {destination} = req.params;
    const result = await destinationServices.getAllTripsByDestination(destination, req.query);


    sendResponse(res, {
        statusCode:200,
        message: "Data fetched successfully",
        result: result
    })
});

const getPopularDestination = asyncHandler(async (req: Request, res: Response) => {
	const result = await destinationServices.getPopularDestination();

	sendResponse(res, {
		statusCode: 200,
		message: "Data updated successfully",
		result: result,
	});
});
export const destinationController = {
	insertIntoDB,
	getAllFromDB,
	getById,
	getBySlug,
	deleteFromDB,
	updateIntoDB,

	//
	getAllTripsByDestination,
	getPopularDestination,
};