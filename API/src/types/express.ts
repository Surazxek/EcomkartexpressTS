import { JWTPayload } from "./globalTypes";


declare global {
    namespace Express {
        interface Request {
            user:JWTPayload
        }
    }
}