import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import authReducer from '../features/auth/authSlice'
import { competitionSlice } from "../features/competitions/competitionSlice"
import { participantSlice } from "../features/competitions/participantSlice"
import { notificationSlice } from "../features/notifications/notificationsSlice"
import { submissionSlice } from "../features/competitions/submissionSlice"
import { invoiceSlice } from "../features/competitions/invoiceSlice"
import { bankSlice } from "../features/competitions/bankAccountSlice"
import { memberSlice } from "../features/users/memberSlice"





export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [competitionSlice.reducerPath]: competitionSlice.reducer,
        [participantSlice.reducerPath]: participantSlice.reducer,
        [notificationSlice.reducerPath]: notificationSlice.reducer,
        [submissionSlice.reducerPath]: submissionSlice.reducer,
        [submissionSlice.reducerPath]: submissionSlice.reducer,
        [invoiceSlice.reducerPath]: invoiceSlice.reducer,
        [bankSlice.reducerPath]: bankSlice.reducer,
        [memberSlice.reducerPath]: memberSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})