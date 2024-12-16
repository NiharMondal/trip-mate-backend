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
exports.profileController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const profile_services_1 = require("./profile.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
//get my profile
const getMyProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield profile_services_1.profileServices.getMyProfile(user === null || user === void 0 ? void 0 : user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User profile fetched successfully",
        result: result,
    });
}));
const updateProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const paylaod = req.body;
    const result = yield profile_services_1.profileServices.updateProfile(user === null || user === void 0 ? void 0 : user.id, paylaod);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User profile updated successfully",
        result,
    });
}));
exports.profileController = { getMyProfile, updateProfile };
