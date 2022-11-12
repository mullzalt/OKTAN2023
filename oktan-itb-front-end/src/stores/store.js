import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "../services/auth/authSlice";
import storage from 'redux-persist/lib/storage'
import { competitionApi } from "../services/competitionService";
import { authApi } from "../services/auth/authApi";
import { persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import { invoiceApi } from "../services/invoiceService";
import { banksApi } from "../services/bankAccountService";


const reducers = combineReducers({
    auth: authSlice,
    [competitionApi.reducerPath]: competitionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [banksApi.reducerPath]: banksApi.reducer
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(thunk)
        .concat(authApi.middleware)
        .concat(competitionApi.middleware)
        .concat(invoiceApi.middleware)
        .concat(banksApi.middleware)
});

export default store;
