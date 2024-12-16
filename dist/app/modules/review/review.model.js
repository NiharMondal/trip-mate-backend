"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: [true, "Review message is required"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        ref: "User"
    },
    tripId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Trip ID is required"],
    },
}, { timestamps: true });
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
