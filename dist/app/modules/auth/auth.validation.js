"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const resetPassword = zod_1.z.object({
    password: zod_1.z
        .string({ required_error: "Password is a required field" })
        .trim(),
    confirmPassword: zod_1.z
        .string({
        required_error: "Confirm password is a required field",
    })
        .trim(),
});
exports.authValidation = { resetPassword };
