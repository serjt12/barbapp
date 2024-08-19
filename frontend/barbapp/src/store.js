// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import loadingReducer from "./features/loading/loadingSlice";
import shopReducer from "./features/shops/shopsSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";
import loadingMiddleware from "./features/loading/loadingMiddleware";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        loading: loadingReducer,
        shop: shopReducer,
        appointments: appointmentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(loadingMiddleware),
});

export const persistor = persistStore(store);
export default store;
