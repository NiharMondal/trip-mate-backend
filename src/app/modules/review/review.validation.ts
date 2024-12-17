import { z } from "zod";

const createReview = z.object({
	comment: z.string({ required_error: "Comment is required" }).trim(),
	rating: z
		.number()
		.min(0, { message: "Min value can not be negative number" })
		.max(5, { message: "Max value is 5" })
		.positive({ message: "Rating can not be nagative" })
		.optional(),
	userId: z.string({ required_error: "User ID is required" }).trim(),
	tripId: z.string({ required_error: "Trip ID is required" }).trim(),
});
const updateReview = z.object({
	comment: z.string().trim().optional(),
	rating: z
		.number()
		.min(0, { message: "Min value can not be negative number" })
		.max(5, { message: "Max value is 5" })
		.positive({ message: "Rating can not be nagative" })
		.optional(),
});

export const reviewValidation = { createReview, updateReview };
