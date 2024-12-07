import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { metaServices } from "./meta.service";
import sendResponse from "../../utils/sendResponse";

const adminMetaData = asyncHandler(async (req: Request, res: Response) => {
	const result = await metaServices.adminMetaData();

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result,
	});
});


const userMetaData = asyncHandler(async (req: Request, res: Response) => {
    const {userId} = req.params;
	const result = await metaServices.userMetaData(userId);

	sendResponse(res, {
		statusCode: 200,
		message: "Data fetched successfully",
		result,
	});
});

export const metaController = { adminMetaData, userMetaData };
