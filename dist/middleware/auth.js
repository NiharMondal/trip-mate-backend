"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../app/modules/user/user.model"));
const CustomeError_1 = __importDefault(require("../app/utils/CustomeError"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(); // No token means the user is not logged in
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.envConfig.jwt_secret);
        const { id } = decodedData;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            throw new CustomeError_1.default(401, "You are not authorized");
        }
        req.user = user; // Attach user to the request
        next();
    }
    catch (error) {
        // Not logged in
        next(error);
    }
});
exports.auth = auth;
