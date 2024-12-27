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
exports.authController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const auth_services_1 = require("./auth.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
//register user
const registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User registered successfully",
        result: result,
    });
}));
const loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User logged in successfully",
        result: result,
    });
}));
//change password
const changePassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_services_1.authServices.changePassword(user.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Password changed successfully",
        result: result,
    });
}));
const forgotPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.forgotPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Reset link is generated",
        result: result,
    });
}));
const resetPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.query;
    const result = yield auth_services_1.authServices.resetPassword(id, token, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Password reseted successfully",
        result: result,
    });
}));
exports.authController = {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
