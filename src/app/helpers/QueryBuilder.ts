import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
	public queryModel: Query<T[], T>;
	public query: Record<string, string | string[] | unknown>;

	constructor(
		queryModel: Query<T[], T>,
		query: Record<string, string | string[] | unknown>
	) {
		this.queryModel = queryModel;
		this.query = query;
	}

	search(searchableFields: string[]) {
		if (this.query?.search) {
			this.queryModel = this.queryModel.find({
				$or: searchableFields.map(
					(field) =>
						({
							[field]: {
								$regex: this.query.search,
								$options: "i",
							},
						} as FilterQuery<T>)
				),
			});
		}
		return this;
	}

	budget() {
		const minPrice = Number(this?.query?.minBudget) || 0;
		const maxPrice = Number(this?.query?.maxBudget) || 12000;
		if (minPrice || maxPrice) {
			this.queryModel = this.queryModel.find({
				$or: [{ budget: { $gte: minPrice, $lte: maxPrice } }],
			});
		}
		return this;
	}

	filter() {
		const queryCopy = { ...this.query };

		const exludedFields = [
			"search",
			"page",
			"limit",
			"sort",
			"orderBy",
			"minBudget",
			"maxBudget",
			"fields",
		];

		// deleting item from main query
		exludedFields.forEach((field) => delete queryCopy[field]);

		if (this.query) {
			this.queryModel = this.queryModel.find(queryCopy);
		}
		return this;
	}

	sort() {
		const sortBy  = this?.query?.sortBy;
		const order = this?.query?.order || "desc";
		let sortString: Record<string, string> = {};
		const sortArr = ["budget","title","rating"];


		if (sortBy || order) {
			
			this.queryModel = this?.queryModel.sort()
		}
		return this;
	}

	paginate() {
		if (this.query?.page || this.query?.limit) {
			const p = Number(this.query.page) || 1;
			const l = Number(this.query.limit) || 12;

			const skip = (p - 1) * l;

			this.queryModel = this.queryModel.skip(skip).limit(l);
		}

		return this;
	}

	fields() {
		if (this?.query?.fields) {
			const field =
				(this?.query?.fields as string).split(",").join(" ") || "- __v";
			this.queryModel = this.queryModel.select(field);
		}
		return this;
	}

	async countTotal() {
		const queries = this.queryModel.getFilter();
		const totalDocs = await this.queryModel.model.countDocuments(queries);
		const limit = Number(this.query?.limit) || 12;

		const totalPages = Math.ceil(totalDocs / limit);
		const currentPage = Number(this?.query?.page) || 1;
		return {
			totalDocs,
			totalPages,
			currentPage,
		};
	}
}

export default QueryBuilder;
