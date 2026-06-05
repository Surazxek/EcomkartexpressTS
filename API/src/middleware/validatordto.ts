import { type Request, type Response, type NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

const bodyValidator = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      if (!data) {
        throw {
          code: 422,
          message: "Data is not set",
        };
      }

      const parseData = await schema.parseAsync(data);
      req.body = parseData;
      next();
    } catch (exception) {
      if (exception instanceof ZodError) {

        let errbag: Record<string, string> = {};

        exception.issues.map((err) => {

         errbag[err.path.join(".")] = err.message

        })
        next({code: 400, detail:errbag, message: "Validation Error"})
      }else{next(exception);}

      
    }
  };
};

export default bodyValidator;