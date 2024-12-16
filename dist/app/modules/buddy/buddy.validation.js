"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyValidation = void 0;
const zod_1 = require("zod");
const createBuddyRequest = zod_1.z.object({
    trip: zod_1.z.string({ required_error: "Trip ID is required" }),
    user: zod_1.z.string({ required_error: "User ID is required" }),
    people: zod_1.z.number().optional(),
    totalCost: zod_1.z.number({ required_error: "Total cost is missing!" })
});
exports.buddyValidation = { createBuddyRequest };
