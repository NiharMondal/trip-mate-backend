import { z } from "zod";

const resetPassword = z.object({
	password: z
		.string({ required_error: "Password is a required field" })
		.trim(),
	confirmPassword: z
		.string({
			required_error: "Confirm password is a required field",
		})
		.trim(),
});

export const authValidation = { resetPassword };
