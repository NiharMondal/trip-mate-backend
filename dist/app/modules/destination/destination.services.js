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
exports.destinationServices = void 0;
const createSlug_1 = require("../../helpers/createSlug");
const QueryBuilder_1 = __importDefault(require("../../helpers/QueryBuilder"));
const CustomeError_1 = __importDefault(require("../../utils/CustomeError"));
const trip_model_1 = __importDefault(require("../trip/trip.model"));
const destination_model_1 = __importDefault(require("./destination.model"));
// only admin can create this
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = (0, createSlug_1.generateSlug)(payload.destination);
    const destiantion = yield destination_model_1.default.findOne({ slug });
    if (destiantion) {
        throw new CustomeError_1.default(302, "Destination already in the list!");
    }
    const res = yield destination_model_1.default.create(Object.assign(Object.assign({}, payload), { slug }));
    return res;
});
// admin
const getAllFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new QueryBuilder_1.default(destination_model_1.default.find(), query)
        .fields();
    const res = yield data.queryModel;
    return res;
});
//find by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield destination_model_1.default.findById(id);
    return res;
});
//find by slug
const getBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    yield destination_model_1.default.findOneAndUpdate({ slug: slug }, { $inc: { visits: 1 } }, //increase visitor field when user click to see details
    { new: true });
    const res = yield destination_model_1.default.findOne({ slug: slug }).populate("trips");
    return res;
});
//delete by ID --> admin/user
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield destination_model_1.default.findByIdAndDelete(id);
    return res;
});
//update by ID --> admin/user
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield destination_model_1.default.findByIdAndUpdate(id, {
        $set: Object.assign({}, payload),
    }, { new: true, runValidators: true });
    return res;
});
// public --> get all trips by destination
const getAllTripsByDestination = (destination, query) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new QueryBuilder_1.default(trip_model_1.default.find({ destination }), query).search([
        "title",
    ]);
    const res = yield data.queryModel;
    return res;
});
// get popular destination
const getPopularDestination = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield destination_model_1.default.find().sort({ visits: -1 }).limit(6);
    return res;
});
exports.destinationServices = {
    insertIntoDB,
    getAllFromDB,
    getById,
    getBySlug,
    deleteFromDB,
    updateIntoDB,
    // extra sevices
    getAllTripsByDestination,
    getPopularDestination,
};
