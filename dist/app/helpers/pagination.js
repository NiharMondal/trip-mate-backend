"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (p, l) => {
    const page = p || 1;
    const limit = l || 2;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
exports.pagination = pagination;
