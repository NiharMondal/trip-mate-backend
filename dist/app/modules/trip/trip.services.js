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
exports.tripServices = void 0;
const destination_model_1 = __importDefault(require("../destination/destination.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const trip_model_1 = __importDefault(require("./trip.model"));
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const createSlug_1 = require("../../helpers/createSlug");
const QueryBuilder_1 = __importDefault(require("../../helpers/QueryBuilder"));
const mongoose_1 = __importDefault(require("mongoose"));
//admin or user
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking destination
    const destination = yield destination_model_1.default.findOne({
        slug: payload.destination,
    });
    if (!destination) {
        throw new CustomeError_1.default(404, "Destination is not defined");
    }
    //checking user
    const user = yield user_model_1.default.findById(payload.user);
    if (!user) {
        throw new CustomeError_1.default(401, "User ID is not valid");
    }
    //generating slug
    const slug = (0, createSlug_1.generateSlug)(payload.title);
    //checking unique slug
    const trip = yield trip_model_1.default.findOne({ slug });
    if (trip) {
        throw new CustomeError_1.default(400, "Title is alreay used for another trip");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //creating trip
        const res = yield trip_model_1.default.create([Object.assign(Object.assign({}, payload), { slug, availAbleSeats: payload.maxGuests })], { session });
        // inserting trip _id to destination collection
        yield destination_model_1.default.findOneAndUpdate({ slug: payload.destination }, { $push: { trips: res[0]._id } }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return res[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new CustomeError_1.default(400, "Something went wrong");
    }
});
// get all trip --> public
const getAllFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new QueryBuilder_1.default(trip_model_1.default.find({ isDeleted: false }), query)
        .search(["title", "destination"])
        .filter()
        .budget()
        .pagination()
        .sort();
    const res = yield data.queryModel;
    const metaData = yield data.countTotal();
    return {
        res,
        metaData,
    };
});
//fing by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_model_1.default.findById(id);
    if (!trip) {
        throw new CustomeError_1.default(404, "Trip not found!");
    }
    return trip;
});
//find by slug --> public
const getBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    yield trip_model_1.default.findOneAndUpdate({ slug: slug }, { $inc: { visitors: 1 } }, //increase visitor field when user click to see details
    { new: true });
    const res = yield trip_model_1.default.findOne({ slug, isDeleted: false })
        .populate("user", "name -_id")
        .populate({
        path: "reviews",
        select: "rating comment userId",
        populate: {
            path: "userId",
            select: "name avatar email",
        },
    });
    return res;
});
//soft delete --> admin/user
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield trip_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    });
    return res;
});
//update by ID --> admin/user
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const trip = yield trip_model_1.default.findById(id);
    if (!trip) {
        throw new CustomeError_1.default(404, "Trip not found!");
    }
    const res = yield trip_model_1.default.findByIdAndUpdate(id, {
        $set: Object.assign({}, payload),
    }, { new: true });
    return res;
});
// get trip by user --> user
const getMyTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield trip_model_1.default.find({
        user: userId,
        isDeleted: false,
    }).select("title destination startDate endDate budget availAbleSeats");
    return res;
});
//freshly added -> public
const freshlyAdded = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield trip_model_1.default.find({ isDeleted: false })
        .select("title rating budget photo slug reviews")
        .limit(10)
        .sort({ createdAt: "desc" });
    return res;
});
// public
const popularTrip = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield trip_model_1.default.find({ isDeleted: false })
        .sort({ rating: -1, visitors: -1 })
        .select("title rating budget photo slug reviews")
        .limit(10);
    return res;
});
// public
const relatedTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTrip = yield trip_model_1.default.findById(id);
    if (!currentTrip) {
        throw new CustomeError_1.default(404, "Trip not found!");
    }
    const minPrice = currentTrip.budget * 0.2;
    const maxPrice = currentTrip.budget * 1.8;
    const minVisitors = currentTrip.visitors * 0.2;
    const maxVisitors = currentTrip.visitors * 1.8;
    const minRatings = currentTrip.visitors * 0.2;
    const maxRatings = currentTrip.visitors * 1.5;
    const res = yield trip_model_1.default.find({
        isDeleted: false,
        _id: { $not: { $eq: id } },
        $or: [
            { budget: { $gte: minPrice, $lte: maxPrice } },
            { visitors: { $gte: minVisitors, $lte: maxVisitors } },
            { rating: { $gte: minRatings, $lte: maxRatings } },
        ],
    }).limit(3);
    return res;
});
exports.tripServices = {
    insertIntoDB,
    getAllFromDB,
    getById,
    getBySlug,
    deleteFromDB,
    updateIntoDB,
    //extra services
    freshlyAdded,
    getMyTrips,
    popularTrip,
    relatedTrip,
};
