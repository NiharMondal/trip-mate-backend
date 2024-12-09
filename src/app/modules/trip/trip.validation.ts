import { z } from "zod";

const createTrip = z.object({
	title: z.string({ required_error: "Title is required" }).trim(),
	from: z.string({ required_error: "Location is required" }).trim(),
	destination: z.string({ required_error: "Destination is required" }).trim(),
	photo: z
		.string({ required_error: "Photo URL is required" })
		.url({ message: "Photo url should be valid" })
		.trim(),
	budget: z.number({ required_error: "Price is required" }),
	maxGuests: z.number({ required_error: "Max guest is required" }),
	startDate: z.string({ required_error: "Start date is required" }).trim(),
	endDate: z.string({ required_error: "End date is required" }).trim(),
	details: z.string({ required_error: "Details is required" }).trim(),
	user: z.string({ required_error: "User ID is required" }),
});

export const tripValidation = { createTrip };
