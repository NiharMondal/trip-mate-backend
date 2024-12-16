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
exports.reviewServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../helpers/QueryBuilder"));
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const trip_model_1 = __importDefault(require("../trip/trip.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const review_model_1 = __importDefault(require("./review.model"));
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking user exist
    const checkUser = yield user_model_1.default.findById(payload.userId);
    if (!checkUser) {
        throw new CustomeError_1.default(404, "User is not found!");
    }
    //checking trip exist
    const checkTrip = yield trip_model_1.default.findById(payload.tripId);
    if (!checkTrip) {
        throw new CustomeError_1.default(404, "Trip is not found!");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // step 1: first transaction ---> create review
        const newReview = yield review_model_1.default.create([payload], { session });
        // step 2: second transaction ----> find review
        const reviews = yield review_model_1.default.find({ tripId: newReview[0].tripId }, null, {
            session,
        });
        // step 3: calculate the new average rating
        const totalRating = reviews.reduce((sum, review) => sum + (review === null || review === void 0 ? void 0 : review.rating), 0);
        const averageRating = Math.round(totalRating / reviews.length);
        // step 4: third transaction --->  Update the trip's rating
        yield trip_model_1.default.findByIdAndUpdate(newReview[0].tripId, { rating: averageRating, $push: { reviews: newReview[0]._id } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return newReview[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new CustomeError_1.default(500, "Something went wrong!");
    }
});
const getAllFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new QueryBuilder_1.default(review_model_1.default.find(), query);
    const res = yield data.queryModel;
    return res;
});
//find by id --> user
const getBySlug = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield review_model_1.default.findOne({
        id,
    });
    return res;
});
//soft delete --> admin/user
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield review_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    });
    return res;
});
//update by ID --> admin/user
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield review_model_1.default.findByIdAndUpdate(id, {
        $set: Object.assign({}, payload),
    }, { new: true });
    return res;
});
exports.reviewServices = {
    insertIntoDB,
    getAllFromDB,
    getBySlug,
    deleteFromDB,
    updateIntoDB,
};
