"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tripSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    from: {
        type: String,
        required: [true, "Starting place is required"],
    },
    destination: {
        type: String,
        required: [true, "Destination is required"],
    },
    photo: {
        type: String,
        required: [true, "Photo URL is required"],
    },
    maxGuests: {
        type: Number,
        default: 10,
    },
    availAbleSeats: {
        type: Number,
    },
    budget: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: String,
        required: [true, "End date required"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    details: {
        type: String,
        required: [true, "End date required"],
    },
    visitors: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    buddyRequest: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Buddy",
        },
    ],
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
}, { timestamps: true });
const Trip = (0, mongoose_1.model)("Trip", tripSchema);
exports.default = Trip;
