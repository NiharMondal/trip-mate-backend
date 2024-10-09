import path from "path";
import dotenv from 'dotenv'


dotenv.config({path: path.join(process.cwd(), ".env")});

export  const envConfig =  {
    port: 5050,
    salt_round: 10,
    database_url: process.env.URI,
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET,
}