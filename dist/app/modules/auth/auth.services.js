"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const createSlug_1 = require("../../helpers/createSlug");
const hashPasword_1 = require("../../helpers/hashPasword");
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = require("../../../config");
const sendEmail_1 = require("../../utils/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (user) {
        throw new CustomeError_1.default(302, "Email already exist");
    }
    //create doc
    const res = yield user_model_1.default.create(payload);
    return {
        id: res._id,
        name: res.name,
        email: res.email,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check user
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (!user) {
        throw new CustomeError_1.default(404, "Invalid credentials");
    }
    const validPassword = yield (0, hashPasword_1.checkPassword)(payload.password, user.password);
    if (!validPassword) {
        throw new CustomeError_1.default(404, "Invalid credentials");
    }
    const tokenPayload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
    const token = (0, createSlug_1.generateToken)(tokenPayload, "7d");
    return {
        accessToken: token,
    };
});
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check newPassword and confirmPassword
    if (payload.newPassword !== payload.confirmPassword) {
        throw new CustomeError_1.default(400, "Password doesn't match!");
    }
    if (payload.oldPassword === payload.newPassword) {
        throw new CustomeError_1.default(400, "New password can't be current password");
    }
    const user = yield user_model_1.default.findById(id).select("password");
    if (!user) {
        throw new CustomeError_1.default(404, "Invalid credentials");
    }
    const matchPassword = yield (0, hashPasword_1.checkPassword)(payload.oldPassword, user.password);
    if (!matchPassword) {
        throw new CustomeError_1.default(404, "Invalid credentials");
    }
    const hashedPassword = yield (0, hashPasword_1.hashPassword)(payload.confirmPassword);
    yield user_model_1.default.findByIdAndUpdate(id, {
        $set: {
            password: hashedPassword,
        },
    }, { new: true });
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (!user) {
        throw new CustomeError_1.default(404, "User not found!");
    }
    if (user && user.isDeleted) {
        throw new CustomeError_1.default(302, "Deleted user can not reset password");
    }
    const tokenPayload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
    const token = (0, createSlug_1.generateToken)(tokenPayload, "10m");
    const resetUiLink = `${config_1.envConfig.front_end_url}/reset-password?id=${user._id}&token=${token}`;
    try {
        const res = yield (0, sendEmail_1.sendEmail)(user.email, resetUiLink);
        return res;
    }
    catch (error) {
        throw new CustomeError_1.default(400, "Something went wrong!");
    }
});
const resetPassword = (userId, token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || !token) {
        throw new CustomeError_1.default(400, "Requested URL is not valid!");
    }
    if (payload.password !== payload.confirmPassword) {
        throw new CustomeError_1.default(400, "Password doesn't match");
    }
    const decodedData = jsonwebtoken_1.default.verify(token, config_1.envConfig.jwt_secret);
    const { id } = decodedData;
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new CustomeError_1.default(404, "You provided invalid token");
    }
    const hashedPassword = yield (0, hashPasword_1.hashPassword)(payload.confirmPassword);
    yield user_model_1.default.findByIdAndUpdate(id, {
        $set: {
            password: hashedPassword,
        },
    }, { new: true });
});
exports.authServices = {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
