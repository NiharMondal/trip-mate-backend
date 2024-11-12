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
		let price: string[] = [];
		if (this.query?.budget) {
			price = (this.query?.budget as string)?.split(",");
			this.queryModel = this.queryModel.find({
				$or: [{ budget: { $gte: price[0], $lte: price[1] } }],
			});
		}
		return this;
	}

	filter() {
		const queryCopy = { ...this.query };

		const exludedFields = ["search", "page", "limit", "sort", "budget"];

		// deleting item from main query
		exludedFields.forEach((field) => delete queryCopy[field]);

		if (this.query) {
			this.queryModel = this.queryModel.find(queryCopy);
		}
		return this;
	}

	sort() {
		let sortString: Record<string, unknown> = {};
		if (this.query?.sort) {
			sortString["budget"] = this.query?.sort;
		}

		this.queryModel = this.queryModel.sort(sortString as {});

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

	async countTotal() {
		const queries = this.queryModel.getFilter();
		const totalDocs = await this.queryModel.model.countDocuments(queries);
		const limit = Number(this.query?.limit) || 12;
		
		const totalPages = Math.ceil(totalDocs / limit);
		const currentPage = Number(this?.query?.page) || 1;
		return {
			totalDocs,
			totalPages,
			currentPage
		};
	}
}

export default QueryBuilder;
