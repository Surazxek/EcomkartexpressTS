"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bodyValidator = (schema) => {
    return async (req, res, next) => {
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
        }
        catch (exception) {
            if (exception instanceof zod_1.ZodError) {
                const errbag = {};
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
exports.default = bodyValidator;
//# sourceMappingURL=validatordto.js.map