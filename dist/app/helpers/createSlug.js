"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const generateSlug = (payload) => {
    const slug = (0, slugify_1.default)(payload, { lower: true, trim: true });
    return slug;
};
exports.generateSlug = generateSlug;
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, config_1.envConfig.jwt_secret, {
        expiresIn: 3600 * 24 * 3,
    });
    return token;
};
exports.generateToken = generateToken;
