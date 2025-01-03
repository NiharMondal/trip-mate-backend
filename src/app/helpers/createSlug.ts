import slugify from "slugify";

import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config";

export const generateSlug = (payload: string) => {
	const slug = slugify(payload, { lower: true, trim: true });
	return slug;
};

export const generateToken = (
	payload: JwtPayload,
	expiresIn: number | string
) => {
	const token = jwt.sign(payload, envConfig.jwt_secret as string, {
		expiresIn,
	});
	return token;
};
