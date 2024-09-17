import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";
import {browseReducer} from "../features/Browse";
import {userLibraryReducer} from "../features/Library";
import {playerReducer} from "../features/Player";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    browse: browseReducer,
    library: userLibraryReducer,
    player: playerReducer,
})
export const store = configureStore({
    reducer:rootReducer,
    devTools: true,
})


