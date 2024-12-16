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
exports.buddyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const trip_model_1 = __importDefault(require("../trip/trip.model"));
const buddy_model_1 = __importDefault(require("./buddy.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
//make a request to join
const requestToJoin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tripExist = yield trip_model_1.default.findById(payload.trip);
    if (!tripExist) {
        throw new CustomeError_1.default(404, "Trip not found!");
    }
    if (tripExist.availAbleSeats < payload.people) {
        throw new CustomeError_1.default(400, "There is no sufficent seats!");
    }
    //start session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //first transaction => create request
        const res = yield buddy_model_1.default.create([payload], { session });
        //second transaction to trip collection
        yield trip_model_1.default.findByIdAndUpdate(res[0].trip, {
            $push: { buddyRequest: res[0]._id },
            $inc: { availAbleSeats: -payload.people },
        }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return res;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new CustomeError_1.default(400, "Something went wrong!");
    }
});
// get outgoing requests (tours the user has requested to join)
const getOutgoingRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new CustomeError_1.default(404, "User not found!");
    }
    const res = yield buddy_model_1.default.find({ user: userId })
        .populate({
        path: "trip",
        select: "user title startDate",
        populate: {
            path: "user",
            select: "name",
        },
    })
        .select("_id status");
    return res;
});
//get incomming requests for the user's trip's
const getIncommingRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield trip_model_1.default.find({ user: userId })
        .populate({
        path: "buddyRequest",
        select: "user people status totalCost",
        populate: {
            path: "user",
            select: "name",
        },
    })
        .select("title startDate endDate availAbleSeats");
    return res;
});
//approve or reject a request
const updateRequestStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const buddyRequest = yield buddy_model_1.default.findOne({
        _id: id,
        user: payload.userId,
    });
    if (!buddyRequest) {
        throw new CustomeError_1.default(404, "Buddy request not found!");
    }
    const res = yield buddy_model_1.default.findByIdAndUpdate(id, {
        $set: { status: payload.status },
    }, { new: true });
    return res;
});
exports.buddyServices = {
    requestToJoin,
    getOutgoingRequests,
    getIncommingRequests,
    updateRequestStatus,
};
