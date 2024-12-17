"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationValidation = void 0;
const zod_1 = require("zod");
const createDestination = zod_1.z.object({
    destination: zod_1.z
        .string({
        required_error: "Destination is required",
        invalid_type_error: "Destination must be string type",
    })
        .max(30, "Max character is 30")
        .min(4, "Min character is 4")
        .trim(),
    shortInfo: zod_1.z
        .string({ required_error: "Short Description is required" })
        .min(50, "Must contain 50 charaters")
        .max(90, "Max charecter is 90")
        .trim(),
    thumbnail: zod_1.z
        .string({ required_error: "Photo URL is required" })
        .url({ message: "Photo url should be valid" })
        .trim(),
});
const updateDestination = zod_1.z.object({
    destination: zod_1.z
        .string({
        invalid_type_error: "Destination must be string type",
    })
        .trim()
        .max(30, "Max character is 30")
        .min(4, "Min character is 4")
        .optional(),
    shortInfo: zod_1.z
        .string({ required_error: "Short Description is required" })
        .min(50, "Must contain 50 charaters")
        .max(90, "Max charecter is 90")
        .optional(),
    thumbnail: zod_1.z
        .string()
        .url({ message: "Thumbnail url should be valid" })
        .trim()
        .optional(),
});
exports.destinationValidation = { createDestination, updateDestination };
