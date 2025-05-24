import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import type { Password } from "../../types/passwordType";
import catchAxiosError from "../../utils/catchAxiosError";

export const AddPasswordAPI = async ({ url, email, encryptedPassword, iv, notes, title }: Password) => {
    try {
        const user = await getUserFromStorage()
        const token = user?.token
        const response = await axios.post(`${BASE_URL}/vault/addPassword`, {
            url,
            email,
            encryptedPassword,
            iv,
            notes,
            title
        }, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error) {
        catchAxiosError(error, "AddPasswordAPI")
        throw error
    }
}