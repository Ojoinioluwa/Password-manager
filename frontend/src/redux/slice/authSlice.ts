import { createSlice } from "@reduxjs/toolkit"
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import type { LocalSorageInfo } from "../../types/userType";


const userInfo = getUserFromStorage() || null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            token: userInfo?.token || null,
            email: userInfo?.email || null,
            firstName: userInfo?.firstName || null
        } as LocalSorageInfo | null
    },
    reducers: {
        loginAction: (state, action) => {
            if (state.user) {
                state.user.token = action.payload.token
                state.user.email = action.payload.email
                state.user.firstName = action.payload.firstName
            }
        },
        logoutAction: (state) => {
            state.user = null
        }
    }
})

const authReducer = authSlice.reducer
export default authReducer;
export const { loginAction, logoutAction } = authSlice.actions;