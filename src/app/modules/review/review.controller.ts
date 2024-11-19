

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

//create trip
const insertIntoDB = asyncHandler(async (req: Request, res: Response) => {
	const result = await reviewServices.insertIntoDB(req.body);

	sendResponse(res, {
		statusCode: 201,
		message: "Data created successfully",
		result: result,
	});
});

//get all trip
const getAllFromDB = asyncHandler(async (req: Request, res: Response) => {
	const result = await reviewServices.getAllFromDB(
		req.query as Record<string, string | unknown>
	);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result
	});
});

//get single data by id
const getById = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await reviewServices.getBySlug(id);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});

//update single data by id
const deleteFromDB = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await reviewServices.deleteFromDB(id);

	sendResponse(res, {
		statusCode: 200,
		message: "Data deleted successfully",
		result: result,
	});
});


const updateIntoDB = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await reviewServices.updateIntoDB(id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "Data updated successfully",
		result: result,
	});
});

export const reviewController = {
	insertIntoDB,
	getAllFromDB,
	getById,
	deleteFromDB,
	updateIntoDB,

};
