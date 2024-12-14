import { generateSlug } from "../../helpers/createSlug";
import QueryBuilder from "../../helpers/QueryBuilder";
import CustomError from "../../utils/CustomeError";
import Trip from "../trip/trip.model";
import { IDestination } from "./destination.interface";
import Destination from "./destination.model";

// only admin can create this
const insertIntoDB = async (payload: IDestination) => {
	const slug = generateSlug(payload.destination);

	const destiantion = await Destination.findOne({ slug });
	if (destiantion) {
		throw new CustomError(302, "Destination already in the list!");
	}
	const res = await Destination.create({ ...payload, slug });

	return res;
};

// admin
const getAllFromDB = async (query: Record<string, unknown>) => {
	const data = new QueryBuilder(Destination.find(), query)
		
		.fields();

	const res = await data.queryModel;

	return res;
};

//find by id
const getById = async (id: string) => {
	const res = await Destination.findById(id);
	return res;
};
//find by slug
const getBySlug = async (slug: string) => {
	await Destination.findOneAndUpdate(
		{ slug: slug },
		{ $inc: { visits: 1 } }, //increase visitor field when user click to see details
		{ new: true }
	);
	const res = await Destination.findOne({ slug: slug }).populate("trips");

	return res;
};

//delete by ID --> admin/user
const deleteFromDB = async (id: string) => {
	const res = await Destination.findByIdAndDelete(id);
	return res;
};

//update by ID --> admin/user
const updateIntoDB = async (id: string, payload: Partial<IDestination>) => {
	const res = await Destination.findByIdAndUpdate(
		id,
		{
			$set: {
				...payload,
			},
		},
		{ new: true, runValidators: true }
	);

	return res;
};

// public --> get all trips by destination
const getAllTripsByDestination = async (
	destination: string,
	query: Record<string, unknown>
) => {
	const data = new QueryBuilder(Trip.find({ destination }), query).search([
		"title",
	]);

	const res = await data.queryModel;

	return res;
};

// get popular destination
const getPopularDestination = async () => {
	const res = await Destination.find().sort({ visits: -1 }).limit(6);

	return res;
};

export const destinationServices = {
	insertIntoDB,
	getAllFromDB,
	getById,
	getBySlug,
	deleteFromDB,
	updateIntoDB,

	// extra sevices
	getAllTripsByDestination,
	getPopularDestination,
};
