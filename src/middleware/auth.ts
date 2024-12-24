import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config";
import User from "../app/modules/user/user.model";
import CustomError from "../app/utils/CustomeError";
import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return next(); // No token means the user is not logged in
		}

		const decodedData = jwt.verify(
			token,
			envConfig.jwt_secret as string
		) as JwtPayload;

		const { id } = decodedData;
		const user = await User.findById(id);

		if (!user) {
			throw new CustomError(401, "You are not authorized");
		}

		req.user = user; // Attach user to the request
		next();
	} catch (error) {
		// Not logged in
		next(error);
	}
};
