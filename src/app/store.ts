import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";
import {browseReducer} from "../features/Browse";


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    browse: browseReducer,
})

export const store = configureStore({
    reducer:rootReducer,
    devTools: true,
})



