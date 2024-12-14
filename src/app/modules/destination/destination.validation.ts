import { z } from "zod";

const createDestination = z.object({
	destination: z
		.string({
			required_error: "Destination is required",
			invalid_type_error: "Destination must be string type",
		})
		.max(30, "Max character is 30")
		.min(4, "Min character is 4")
		.trim(),

	shortInfo: z
		.string({ required_error: "Short Description is required" })
		.min(50, "Must contain 50 charaters")
		.max(90, "Max charecter is 90")
		.trim(),
	thumbnail: z
		.string({ required_error: "Photo URL is required" })
		.url({ message: "Photo url should be valid" })
		.trim(),
});

const updateDestination = z.object({
	destination: z
		.string({
			invalid_type_error: "Destination must be string type",
		})
		.trim()
		.max(30, "Max character is 30")
		.min(4, "Min character is 4")
		.optional(),
	shortInfo: z
		.string({ required_error: "Short Description is required" })
		.min(50, "Must contain 50 charaters")
		.max(90, "Max charecter is 90")
		.optional(),
});

export const destinationValidation = { createDestination, updateDestination };
