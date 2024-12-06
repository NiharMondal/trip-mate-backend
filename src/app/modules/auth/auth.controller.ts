import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";

const options: Record<string, any> = {
	httpOnly: true,
	secure: true, // Set to true in production for HTTPS
	sameSite: "Strict",
	path: "/",
	maxAge: 3600000 * 24, // 1 day
};
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

	res.cookie("tm", result.accessToken, options);

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

export const authController = {
	registerUser,
	loginUser,

	changePassword,
};
