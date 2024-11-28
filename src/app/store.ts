import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";
import {browseReducer} from "../features/Browse";
import {userLibraryReducer} from "../features/Library";
import {playerReducer} from "../features/Player";

const combinedReducer =  combineReducers({
    app: appReducer,
    auth: authReducer,
    browse: browseReducer,
    library: userLibraryReducer,
    player: playerReducer,
})
//todo: create action auth/logout
export const rootReducer = (state: any, action: AnyAction) =>{
    if(action.type === 'auth/logout'){
        state = {}
    }
    return combinedReducer(state, action)
}
export const store = configureStore({
    reducer:rootReducer,
    devTools: true,
})


