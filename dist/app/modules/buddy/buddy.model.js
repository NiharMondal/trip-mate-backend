"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const buddy_interface_1 = require("./buddy.interface");
const buddySchema = new mongoose_1.Schema({
    trip: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Trip",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    people: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: buddy_interface_1.Status,
        default: "PENDING",
    },
    totalCost: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Buddy = (0, mongoose_1.model)("Buddy", buddySchema);
exports.default = Buddy;
