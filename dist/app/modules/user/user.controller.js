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
exports.userController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_services_1 = require("./user.services");
//get all user
const getAllFromDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
//get single data by id
const getById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_services_1.userServices.getById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
//delete single data by id
const deleteFromDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_services_1.userServices.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data deleted successfully",
        result: result
    });
}));
const updateIntoDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_services_1.userServices.updateIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data updated successfully",
        result: result
    });
}));
const getOutGoingRequest = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.userServices.getOutGoingRequest(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result,
    });
}));
const getIncommingRequests = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.userServices.getIncommingRequests(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result,
    });
}));
exports.userController = {
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB,
    getOutGoingRequest,
    getIncommingRequests,
};
