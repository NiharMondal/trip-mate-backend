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
exports.destinationController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const destination_services_1 = require("./destination.services");
//create trip
const insertIntoDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_services_1.destinationServices.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Data created successfully",
        result: result
    });
}));
//get all trip
const getAllFromDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_services_1.destinationServices.getAllFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
//get single data by slug
const getBySlug = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield destination_services_1.destinationServices.getBySlug(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
//get single data by id
const getById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield destination_services_1.destinationServices.getById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
//update single data by id
const deleteFromDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield destination_services_1.destinationServices.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data deleted successfully",
        result: result
    });
}));
const updateIntoDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield destination_services_1.destinationServices.updateIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data updated successfully",
        result: result
    });
}));
//get all trip
const getAllTripsByDestination = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { destination } = req.params;
    const result = yield destination_services_1.destinationServices.getAllTripsByDestination(destination, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result: result
    });
}));
const getPopularDestination = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield destination_services_1.destinationServices.getPopularDestination();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data updated successfully",
        result: result,
    });
}));
exports.destinationController = {
    insertIntoDB,
    getAllFromDB,
    getById,
    getBySlug,
    deleteFromDB,
    updateIntoDB,
    //
    getAllTripsByDestination,
    getPopularDestination,
};
