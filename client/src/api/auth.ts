import type { ILogin } from "../types/auth.types"
import api from './axios'

export const login = async (data: ILogin) => {
    try {
        
        const response = await api.post('/auth/login', data)

        return  response.data.data
    } catch (error: any) {
        throw error.response.data
    }
}


export const register = async (data: ILogin) => {
    try {
        
        const response = await api.post('/auth/register', data)

        return  response.data.data
    } catch (error: any) {
        throw error.data
    }
}