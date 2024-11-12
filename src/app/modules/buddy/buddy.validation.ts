import {z} from 'zod'

const createBuddyRequest = z.object({
    trip: z.string({required_error:"Trip ID is required"}),
    user: z.string({required_error:"User ID is required"}),
    people: z.number().optional(),
    totalCost: z.number({required_error:"Total cost is missing!"})
});



export const buddyValidation = {createBuddyRequest}