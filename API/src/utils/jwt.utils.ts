import jwt from  'jsonwebtoken'
import { JWTPayload } from '../types/globalTypes'
  
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string
const JWT_SECRET = process.env.JWT_SECRET as string

export const generateJWTToken = (payload: JWTPayload) => {
    return jwt.sign(payload, 'asdas', {expiresIn: JWT_EXPIRES_IN as any})
}


export const decodeJWTToken =  (token : string) => {
    return jwt.verify(token,JWT_SECRET)
}