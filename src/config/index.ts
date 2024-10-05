import path from "path";
import dotenv from 'dotenv'


dotenv.config({path: path.join(process.cwd(), ".env")});

export  const envConfig =  {
    port: 5000,
    database_url: process.env.URI,
    salt_round: 10,
}