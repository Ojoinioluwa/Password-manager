import axios from "axios";
import { BASE_URL } from "../../utils/url";
import type { AddAuthorizeUser } from "../../types/authorseType";
import  catchAxiosError from "../../utils/catchAxiosError";
import { getUserFromStorage } from "../../utils/getUserFromStorage";


export const AddAuthorizeUserAPI = async({encryptedPassword, email, iv, expiresAt, passwordId}: AddAuthorizeUser)=>{
    try {
        const user = getUserFromStorage();
        const token = user?.token
        const response = await axios.post(`${BASE_URL}/`, {
            encryptedPassword, 
            email, 
            iv, 
            expiresAt, 
            passwordId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        catchAxiosError(error, "AddAuthorizeUserAPI");
        throw error
    }
}
