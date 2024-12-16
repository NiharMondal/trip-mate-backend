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
exports.metaServices = void 0;
const mongoose_1 = require("mongoose");
const buddy_model_1 = __importDefault(require("../buddy/buddy.model"));
const destination_model_1 = __importDefault(require("../destination/destination.model"));
const review_model_1 = __importDefault(require("../review/review.model"));
const trip_model_1 = __importDefault(require("../trip/trip.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const adminMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield trip_model_1.default.countDocuments();
    const users = yield user_model_1.default.countDocuments();
    const buddies = yield buddy_model_1.default.countDocuments();
    const reviews = yield review_model_1.default.countDocuments();
    const destinations = yield destination_model_1.default.countDocuments();
    return {
        trips,
        users,
        buddies,
        reviews,
        destinations,
    };
});
const userMetaData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const trips = (yield trip_model_1.default.find({ user: userId })).length;
    const reviews = (yield review_model_1.default.find({ userId })).length;
    const outgoing = (yield buddy_model_1.default.find({ user: userId })).length;
    const totalRequests = yield trip_model_1.default.aggregate([
        // Match trips created by the user
        { $match: { user: new mongoose_1.Types.ObjectId(userId) } },
        // Project to calculate the size of buddyRequest array
        {
            $project: {
                buddyRequestCount: { $size: "$buddyRequest" },
            },
        },
        // // Group and sum up the counts
        {
            $group: {
                _id: null,
                totalRequests: { $sum: "$buddyRequestCount" },
            },
        },
    ]);
    const incoming = ((_a = totalRequests[0]) === null || _a === void 0 ? void 0 : _a.totalRequests) || 0;
    return {
        trips,
        reviews,
        outgoing,
        incoming
    };
});
exports.metaServices = { adminMetaData, userMetaData };
