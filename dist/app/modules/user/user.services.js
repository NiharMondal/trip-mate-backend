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
exports.userServices = void 0;
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const buddy_model_1 = __importDefault(require("../buddy/buddy.model"));
const trip_model_1 = __importDefault(require("../trip/trip.model"));
const user_model_1 = __importDefault(require("./user.model"));
//admin
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.default.find({ isDeleted: false }).select("-password -__v");
    return res;
});
//find by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.default.findById(id).select("name email avatar");
    return res;
});
//delete by ID
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new CustomeError_1.default(404, "User not found!");
    }
    const res = yield user_model_1.default.findByIdAndUpdate(id, { isDeleted: true });
    return res;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.default.findByIdAndUpdate(id, {
        $set: Object.assign({}, payload),
    }, { new: true });
    return res;
});
const getOutGoingRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new CustomeError_1.default(404, "User not found!");
    }
    const res = yield buddy_model_1.default.find({ buddy: userId })
        .populate({
        path: "trip",
        select: "title startDate endDate",
        populate: {
            path: "user",
            select: "name email",
        },
    })
        .select("_id status totalCost");
    return res;
});
//get incomming requests for the all trips
const getIncommingRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield trip_model_1.default.findOne({ user: userId });
    if (!user) {
        throw new CustomeError_1.default(404, "User not found!");
    }
    const res = yield trip_model_1.default.find({ user: userId })
        .populate({
        path: "buddyRequest",
        select: "people status totalCost",
        populate: {
            path: "buddy",
            select: "name",
        },
    })
        .select("title startDate endDate availAbleSeats");
    return res;
});
exports.userServices = {
    getAllFromDB,
    getById,
    deleteFromDB,
    updateIntoDB,
    getOutGoingRequest,
    getIncommingRequests,
};
