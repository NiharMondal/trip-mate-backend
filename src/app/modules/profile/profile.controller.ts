import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { profileServices } from "./profile.services";
import sendResponse from "../../utils/sendResponse";

//get my profile
const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
	const user= req.user;
	const result = await profileServices.getMyProfile(user?.id);

	sendResponse(res, {
		statusCode: 200,
		message: "User profile fetched successfully",
		result: result,
	});
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user;
	const paylaod = req.body;
	const result = await  profileServices.updateProfile(user?.id, paylaod);

	sendResponse(res, {
		statusCode: 200,
		message: "User profile updated successfully",
		result,
	});
});

export const profileController = { getMyProfile, updateProfile };
