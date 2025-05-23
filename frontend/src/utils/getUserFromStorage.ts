import type { LocalSorageInfo } from "../types/userType";


export const getUserFromStorage = (): LocalSorageInfo | null => {
    const stored = localStorage.getItem("UserInfo");
    if(!stored) return null;
    try {
        const parsedUser = JSON.parse(stored)
        return parsedUser
    } catch (error) {
        console.log("Failed to parse user from storage", error)
        return null;
    }
}