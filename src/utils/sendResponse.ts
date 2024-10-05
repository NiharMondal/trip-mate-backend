import { Response } from "express";

type TResponse<T> = {
    statusCode: number;
    message: string;
    result: T[] | T;
}

const sendResponse =  <T>( res:Response, data: TResponse<T>)=>{
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.result
    })
};

export default sendResponse;