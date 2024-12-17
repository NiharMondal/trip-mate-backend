"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    comment: zod_1.z.string({ required_error: "Comment is required" }).trim(),
    rating: zod_1.z
        .number()
        .min(0, { message: "Min value can not be negative number" })
        .max(5, { message: "Max value is 5" })
        .positive({ message: "Rating can not be nagative" })
        .optional(),
    userId: zod_1.z.string({ required_error: "User ID is required" }).trim(),
    tripId: zod_1.z.string({ required_error: "Trip ID is required" }).trim(),
});
const updateReview = zod_1.z.object({
    comment: zod_1.z.string().trim().optional(),
    rating: zod_1.z
        .number()
        .min(0, { message: "Min value can not be negative number" })
        .max(5, { message: "Max value is 5" })
        .positive({ message: "Rating can not be nagative" })
        .optional(),
});
exports.reviewValidation = { createReview, updateReview };
