import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { tripServices } from "./trip.services";
import sendResponse from "../../utils/sendResponse";

//create trip
const insertIntoDB = asyncHandler(async (req: Request, res: Response) => {
	const result = await tripServices.insertIntoDB(req.body);

	sendResponse(res, {
		statusCode: 201,
		message: "Data created successfully",
		result: result,
	});
});

//get all trip
const getAllFromDB = asyncHandler(async (req: Request, res: Response) => {
	const result = await tripServices.getAllFromDB(
		req.query as Record<string, string | unknown>
	);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result.res,
		meta: result.metaData,
	});
});

//get by id
const getById = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await tripServices.getById(id);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});
//get single data by slug
const getBySlug = asyncHandler(async (req: Request, res: Response) => {
	const { slug } = req.params;
	const result = await tripServices.getBySlug(slug);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});

//update single data by id
const deleteFromDB = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await tripServices.deleteFromDB(id);

	sendResponse(res, {
		statusCode: 200,
		message: "Data deleted successfully",
		result: result,
	});
});

const updateIntoDB = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await tripServices.updateIntoDB(id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "Data updated successfully",
		result: result,
	});
});

//get all trip by userId
const getMyTrips = asyncHandler(async (req: Request, res: Response) => {
	const { userId } = req.params;
	const result = await tripServices.getMyTrips(userId);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});

//freshly added
const freshlyAdded = asyncHandler(async (req: Request, res: Response) => {
	const result = await tripServices.freshlyAdded();

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});

const popularTrip = asyncHandler(async (req: Request, res: Response) => {
	const result = await tripServices.popularTrip();

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});
const relatedTrip = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await tripServices.relatedTrip(id);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result: result,
	});
});
export const tripController = {
	insertIntoDB,
	getAllFromDB,
	getById,
	getBySlug,
	deleteFromDB,
	updateIntoDB,

	//extra controller
	freshlyAdded,
	getMyTrips,
	popularTrip,
	relatedTrip,
};
