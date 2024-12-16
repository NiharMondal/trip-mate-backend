"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const destinationSchema = new mongoose_1.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
        unique: true,
    },
    shortInfo: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    visits: {
        type: Number,
        default: 0,
    },
    trips: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Trip",
        },
    ],
}, {
    timestamps: true,
});
const Destination = (0, mongoose_1.model)("Destination", destinationSchema);
exports.default = Destination;
