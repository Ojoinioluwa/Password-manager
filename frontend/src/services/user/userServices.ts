import axios from "axios"
import catchAxiosError from "../../utils/catchAxiosError"
import type { Login, LoginResponse, User, VerifyEmail } from "../../types/userType"
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from "../../utils/getUserFromStorage";


export const LoginAPI = async ({ email, password }: Login): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password })
        return response.data
    } catch (error) {
        catchAxiosError(error, "LoginAPI Error")
        throw error
    }
}

export const RegisterAPI = async({email, password, phoneNumber, firstName, lastName,}: User) => {
    try {
       const response = await axios.post(`${BASE_URL}/auth/register`, {email, password, phoneNumber, firstName, lastName}) 
       return response.data
    } catch (error) {
        catchAxiosError(error, "RegisterAPI Error");
        throw error
    }
}

export const VerifyEmailAPI = async({email, verificationCode}: VerifyEmail) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/verify-user`, { email, verificationCode })
        return response.data
    } catch (error) {
        catchAxiosError(error, "VerifyEmailAPI Error")
        throw error
    }
}

export const GetUserAPI = async()=> {
    try {
        const user = await getUserFromStorage()
        const token = user?.token
        const response = await axios.get(`${BASE_URL}/getuserProfile`, { headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        catchAxiosError(error, "GetUserAPI")
    }
}