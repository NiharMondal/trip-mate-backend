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
exports.metaController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const meta_service_1 = require("./meta.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const adminMetaData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meta_service_1.metaServices.adminMetaData();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result,
    });
}));
const userMetaData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield meta_service_1.metaServices.userMetaData(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Data fetched successfully",
        result,
    });
}));
exports.metaController = { adminMetaData, userMetaData };
