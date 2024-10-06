import express, { Application } from 'express';
import cors from "cors"
import notFoundRoute from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import rootRouter from './routes';



const app: Application = express();

app.use(express.json());
app.use(cors())


app.use("/api/v1", rootRouter)

//not found route handler
app.use(notFoundRoute)


//global error controller/ handler
app.use(globalErrorHandler)


export default app;