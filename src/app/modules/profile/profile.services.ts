import CustomError from "../../utils/CustomeError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const getMyProfile = async (userId: string) => {
	const user = await User.findById(userId).select("name email avatar role");

	return user;
};

const updateProfile = async (userId: string, payload: Partial<IUser>) => {
	// checking user
	const user = await User.findById(userId);
	if (!user) {
		throw new CustomError(401, "You are not authenticated!");
	}

	//checking email
	const emailExist = await User.findOne({ email: payload.email });

	if (emailExist) {
		throw new CustomError(400, "Email already exist!");
	}

	//update user
	const res = await User.findByIdAndUpdate(
		userId,
		{
			$set: {
				...payload,
			},
		},
		{ new: true }
	).select("name email role avatar");

	return res;
};

export const profileServices = { getMyProfile, updateProfile };
