export const pagination = (p: number, l: number) => {
	const page = p || 1;
	const limit = l || 2;
	const skip = (page - 1) * limit;

	return { page, limit, skip };
};
