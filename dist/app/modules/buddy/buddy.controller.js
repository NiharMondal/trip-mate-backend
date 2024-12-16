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
exports.buddyController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const buddy_services_1 = require("./buddy.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
//create trip
const requestToJoin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buddy_services_1.buddyServices.requestToJoin(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Data created successfully",
        result: result,
    });
}));
const getIncommingRequests = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield buddy_services_1.buddyServices.getIncommingRequests(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result,
    });
}));
const getOutgoingRequests = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield buddy_services_1.buddyServices.getOutgoingRequests(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result,
    });
}));
//update status
const updateRequestStatus = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield buddy_services_1.buddyServices.updateRequestStatus(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data updated successfully",
        result: result,
    });
}));
exports.buddyController = {
    requestToJoin,
    getOutgoingRequests,
    getIncommingRequests,
    updateRequestStatus,
};
