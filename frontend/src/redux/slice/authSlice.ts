import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import type { LocalSorageInfo } from "../../types/userType";

const userInfo = getUserFromStorage();
const savedMasterSecret = localStorage.getItem("masterSecret");

interface AuthState {
    user: LocalSorageInfo | null;
    masterSecret: string | null;
}

const initialState: AuthState = {
    user: userInfo || null,
    masterSecret: savedMasterSecret || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LocalSorageInfo>) => {
            // Replace the entire user object (email, token, firstName)
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
            state.masterSecret = null; // also clear secret on logout
        },
        setMasterSecret: (state, action: PayloadAction<string>) => {
            state.masterSecret = action.payload;
        },
        clearMasterSecret: (state) => {
            state.masterSecret = null;
        },
    },
});

export const {
    loginAction,
    logoutAction,
    setMasterSecret,
    clearMasterSecret,
} = authSlice.actions;

export default authSlice.reducer;
