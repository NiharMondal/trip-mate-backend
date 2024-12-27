import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
	port: 5000,
	salt_round: 10,
	front_end_url: process.env.FRONT_END_URL,
	database_url: process.env.URI,
	mongo_uri: process.env.MONGO_URI,
	jwt_secret: process.env.JWT_SECRET,
	jwt_expire: process.env.JWT_EXPIRE,
	emailUtils: {
		email: process.env.EMAIL,
		password: process.env.PASSWORD,
	},
};
