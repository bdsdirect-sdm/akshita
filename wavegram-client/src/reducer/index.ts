import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //Local storage for persistence
import userReducer from "../Slices/userSlice"
import wavesReducer from "../Slices/waveSlice"

//persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token", "profile"],
};

const rootReducer = combineReducers({
    user: userReducer,
    waves: wavesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
});

export const persistor = persistStore(store);

