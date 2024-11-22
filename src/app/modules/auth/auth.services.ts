import { JwtPayload } from "jsonwebtoken";
import { generateToken } from "../../helpers/createSlug";
import { checkPassword } from "../../helpers/hashPasword";
import CustomError from "../../utils/CustomeError";
import User from "../user/user.model";
import { IRegisterUser, ITokenPayload } from "./auth.interface";

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
		role:user.role
	} as JwtPayload;

	const token = generateToken(tokenPayload);

	return {
		accessToken: token,
	};
};

export const authServices = {
	registerUser,
	loginUser,
};
