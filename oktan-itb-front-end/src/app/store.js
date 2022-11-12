import { configureStore }  from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import authReducer from '../features/auth/authSlice'
import { competitionSlice } from "../features/competitions/competitionSlice"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer, 
        [competitionSlice.reducerPath]: competitionSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})