import { generateSlug } from "../../helpers/createSlug";
import QueryBuilder from "../../helpers/QueryBuilder";
import { IDestination } from "./destination.interface";
import Destination from "./destination.model";

// only admin can create this
const insertIntoDB = async (payload: IDestination) => {
	const slug = generateSlug(payload.destination);

	const res = await Destination.create({ ...payload, slug });

	return res;
};

// admin
const getAllFromDB = async (query: Record<string, unknown>) => {
	const data = new QueryBuilder(
		Destination.find(),
		query
	).pagination().fields()

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

export const destinationServices = {
	insertIntoDB,
	getAllFromDB,
	getById,
	getBySlug,
	deleteFromDB,
	updateIntoDB,
};
