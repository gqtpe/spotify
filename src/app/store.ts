import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer:rootReducer,
    devTools: true,
})



