import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { buddyServices } from "./buddy.services";
import sendResponse from "../../utils/sendResponse";


//create trip
const requestToJoin = asyncHandler(async (req: Request, res: Response) => {
	const result = await buddyServices.requestToJoin(req.body);

	sendResponse(res, {
		statusCode: 201,
		message: "Data created successfully",
		result: result,
	});
});

const getIncommingRequests = asyncHandler(
	async (req: Request, res: Response) => {
        const {userId} = req.params;
		const result = await buddyServices.getIncommingRequests(userId);

		sendResponse(res, {
			statusCode: 200,
			message: "Data fetched successfully",
			result: result,
		});
	}
);

const getOutgoingRequests = asyncHandler(
	async (req: Request, res: Response) => {
        const { userId } = req.params;
		const result = await buddyServices.getOutgoingRequests(userId);

		sendResponse(res, {
			statusCode: 200,
			message: "Data fetched successfully",
			result: result,
		});
	}
);

//update status
const updateRequestStatus = asyncHandler(
	async (req: Request, res: Response) => {
        const {requestId} = req.params;

		const result = await buddyServices.updateRequestStatus(requestId, req.body);

		sendResponse(res, {
			statusCode: 200,
			message: "Data updated successfully",
			result: result,
		});
	}
);



export const buddyController = {
	requestToJoin,
	getOutgoingRequests,
    getIncommingRequests,
    updateRequestStatus
};