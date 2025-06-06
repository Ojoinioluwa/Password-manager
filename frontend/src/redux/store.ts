import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
// import masterReducer from "./slice/master";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // master: masterReducer
    }
})