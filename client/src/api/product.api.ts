
import api from './axios'

// export const getFeaturedProduct = async () => {
//     try {
        
//         const response = await api.get('/product/featured')
//     } catch (error:any) {
//         throw error.response.data
//     }
// }


export const getAllProducts = async () => {
    try {
        
        const response  = await api.get('/product')
        console.log("Raw API response:", response.data); // 👈 log here
        return response.data
        
    } catch (error:any) {
        throw error.response.data
    }
}