import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth/authSlice";


const rootReducer = combineReducers({
    auth: authReducer
})

export const store = configureStore({
    reducer:rootReducer,
    devTools: true,
})


export type AppRootStateType = ReturnType<typeof rootReducer>
