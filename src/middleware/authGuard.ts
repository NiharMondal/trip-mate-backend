import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../app/utils/CustomeError";
import { envConfig } from "../config";
import User from "../app/modules/user/user.model";

export const authGaurd = (...roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization;

		try {
			if (!token) {
				throw new CustomError(401, "You are not authorized");
			}

			const decodedData = jwt.verify(
				token,
				envConfig.jwt_secret as string
			) as JwtPayload;

			const { id, role } = decodedData;

			const user = await User.findById(id);

			if (!user) {
				throw new CustomError(401, "You are not authorized");
			}

			if (token && !roles.includes(role)) {
				throw new CustomError(403, "You are not authorized");
			}

			req.user = decodedData as JwtPayload;

			next();
		} catch (error) {
			next(error);
		}
	};
};
