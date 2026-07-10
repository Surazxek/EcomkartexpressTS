import { type NextFunction, RequestHandler, type Request, type Response } from "express";


export const asyncHandler = (fn:RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req,res,next)).catch (next)
    }
}