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
exports.profileServices = void 0;
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId).select("name email avatar role");
    return user;
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new CustomeError_1.default(401, "You are not authenticated!");
    }
    //checking email
    const emailExist = yield user_model_1.default.findOne({ email: payload.email });
    if (emailExist) {
        throw new CustomeError_1.default(400, "Email already exist!");
    }
    //update user
    const res = yield user_model_1.default.findByIdAndUpdate(userId, {
        $set: Object.assign({}, payload),
    }, { new: true }).select("name email role avatar");
    return res;
});
exports.profileServices = { getMyProfile, updateProfile };
