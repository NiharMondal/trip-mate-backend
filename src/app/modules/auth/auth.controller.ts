import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";

//register user
const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const result = await authServices.registerUser(req.body);

	sendResponse(res, {
		statusCode: 201,
		message: "User registered successfully",
		result: result,
	});
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
	const result = await authServices.loginUser(req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "User logged in successfully",
		result: result,
	});
});

//change password
const changePassword = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user;
	const result = await authServices.changePassword(user.id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "Password changed successfully",
		result: result,
	});
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
	const result = await authServices.forgotPassword(req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "Reset link is generated",
		result: result,
	});
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
	const { id, token } = req.query;
	const result = await authServices.resetPassword(
		id as string,
		token as string,
		req.body
	);

	sendResponse(res, {
		statusCode: 200,
		message: "Password reseted successfully",
		result: result,
	});
});
export const authController = {
	registerUser,
	loginUser,
	changePassword,
	forgotPassword,
	resetPassword,
};
