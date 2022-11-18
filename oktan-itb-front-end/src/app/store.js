import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import authReducer from '../features/auth/authSlice'
import { competitionSlice } from "../features/competitions/competitionSlice"
import { participantSlice } from "../features/competitions/participantSlice"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [competitionSlice.reducerPath]: competitionSlice.reducer,
        [participantSlice.reducerPath]: participantSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})