import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (err:any, req:Request, res: Response, next: NextFunction)=>{

    const errorResponse = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Something went wrong!",
        errorDetails: err
    }

    res.status(errorResponse.statusCode).json({
        success: false,
        message: errorResponse.message,
        errorDetails: errorResponse.errorDetails,
    })
};


export default globalErrorHandler;