import { type Request, type Response, type NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";

const bodyValidator = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return next({
          statusCode: 422,
          status: "fail",
          success: false,
          message: "Data is not set",
        });
      }

      const parseData = await schema.parseAsync(data);
      req.body = parseData;
      return next();
    } catch (exception) {
      if (exception instanceof ZodError) {
        const errbag: Record<string, string> = {};

        exception.issues.forEach((err) => {
          const path = err.path.length > 0 ? err.path.join(".") : "body";
          errbag[path] = err.message;
        });

        return next({
          statusCode: 400,
          status: "fail",
          success: false,
          detail: errbag,
          message: "Validation Error",
        });
      }

      return next(exception);
    }
  };
};

export default bodyValidator;
