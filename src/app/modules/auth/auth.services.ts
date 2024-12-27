import { JwtPayload } from "jsonwebtoken";
import { generateToken } from "../../helpers/createSlug";
import { checkPassword, hashPassword } from "../../helpers/hashPasword";
import CustomError from "../../utils/CustomeError";
import User from "../user/user.model";
import {
	IChangePassword,
	IForgotPassword,
	IRegisterUser,
	IResetPassword,
} from "./auth.interface";
import { envConfig } from "../../../config";
import { sendEmail } from "../../utils/sendEmail";
import jwt from "jsonwebtoken";
const registerUser = async (payload: IRegisterUser) => {
	const user = await User.findOne({ email: payload.email });

	if (user) {
		throw new CustomError(302, "Email already exist");
	}
	//create doc
	const res = await User.create(payload);

	return {
		id: res._id,
		name: res.name,
		email: res.email,
	};
};

const loginUser = async (payload: Omit<IRegisterUser, "name">) => {
	//check user
	const user = await User.findOne({ email: payload.email });
	if (!user) {
		throw new CustomError(404, "Invalid credentials");
	}

	const validPassword = await checkPassword(payload.password, user.password);

	if (!validPassword) {
		throw new CustomError(404, "Invalid credentials");
	}

	const tokenPayload = {
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	} as JwtPayload;

	const token = generateToken(tokenPayload, "7d");

	return {
		accessToken: token,
	};
};

const changePassword = async (id: string, payload: IChangePassword) => {
	//check newPassword and confirmPassword
	if (payload.newPassword !== payload.confirmPassword) {
		throw new CustomError(400, "Password doesn't match!");
	}

	if (payload.oldPassword === payload.newPassword) {
		throw new CustomError(400, "New password can't be current password");
	}

	const user = await User.findById(id).select("password");

	if (!user) {
		throw new CustomError(404, "Invalid credentials");
	}

	const matchPassword = await checkPassword(
		payload.oldPassword,
		user.password
	);

	if (!matchPassword) {
		throw new CustomError(404, "Invalid credentials");
	}
	const hashedPassword = await hashPassword(payload.confirmPassword);

	await User.findByIdAndUpdate(
		id,
		{
			$set: {
				password: hashedPassword,
			},
		},
		{ new: true }
	);
};

const forgotPassword = async (payload: IForgotPassword) => {
	const user = await User.findOne({ email: payload.email });

	if (!user) {
		throw new CustomError(404, "User not found!");
	}

	if (user && user.isDeleted) {
		throw new CustomError(302, "Deleted user can not reset password");
	}

	const tokenPayload = {
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	} as JwtPayload;

	const token = generateToken(tokenPayload, "10m");
	const resetUiLink = `${envConfig.front_end_url}/reset-password?id=${user._id}&token=${token}`;
	try {
		const res = await sendEmail(user.email, resetUiLink);
		return res;
	} catch (error) {
		throw new CustomError(400, "Something went wrong!");
	}
};

const resetPassword = async (
	userId: string,
	token: string,
	payload: IResetPassword
) => {
	if (!userId || !token) {
		throw new CustomError(400, "Requested URL is not valid!");
	}
	if (payload.password !== payload.confirmPassword) {
		throw new CustomError(400, "Password doesn't match");
	}

	const decodedData = jwt.verify(
		token,
		envConfig.jwt_secret as string
	) as JwtPayload;

	const { id } = decodedData;
	const user = await User.findById(id);
	if (!user) {
		throw new CustomError(404, "You provided invalid token");
	}

	const hashedPassword = await hashPassword(payload.confirmPassword);

	await User.findByIdAndUpdate(
		id,
		{
			$set: {
				password: hashedPassword,
			},
		},
		{ new: true }
	);
};

export const authServices = {
	registerUser,
	loginUser,
	changePassword,

	forgotPassword,
	resetPassword,
};
