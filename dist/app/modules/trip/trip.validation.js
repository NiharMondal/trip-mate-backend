"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidation = void 0;
const zod_1 = require("zod");
const createTrip = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Title is required" }).trim(),
    from: zod_1.z.string({ required_error: "Location is required" }).trim(),
    destination: zod_1.z.string({ required_error: "Destination is required" }).trim(),
    photo: zod_1.z
        .string({ required_error: "Photo URL is required" })
        .url({ message: "Photo url should be valid" })
        .trim(),
    budget: zod_1.z.number({ required_error: "Price is required" }),
    maxGuests: zod_1.z.number({ required_error: "Max guest is required" }),
    startDate: zod_1.z.string({ required_error: "Start date is required" }).trim(),
    endDate: zod_1.z.string({ required_error: "End date is required" }).trim(),
    details: zod_1.z.string({ required_error: "Details is required" }).trim(),
    user: zod_1.z.string({ required_error: "User ID is required" }),
});
exports.tripValidation = { createTrip };
