import {createSlice} from "@reduxjs/toolkit";

export type Token = string | null
type StateType = {
    loggedIn: boolean
    authToken: Token
}
export const slice = createSlice({
    name: 'auth',
    initialState:{
        loggedIn: false ,
        authToken: null ,
    } as StateType,
    reducers:{
        setToken(state, action: {payload: Token}){
            if(action.payload){
                state.authToken = action.payload
                state.loggedIn = true
            }
        }
    }
})
export const authReducer = slice.reducer
