import type { ILogin, IRegister } from "../types/auth.types"
import api from './axios'

export const login = async (data: ILogin) => {
    try {
        
        const response = await api.post('/auth/login', data)

        // return  response.data.data
        return  response.data
    } catch (error: any) {
        throw error.response.data
    }
}


export const register = async (data: Omit<IRegister, "confirm_password" >) => {
    try {
        
        const response = await api.post('/auth/register', data)

        return  response.data
    } catch (error: any) {
        throw error.response.data
    }
}


export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};