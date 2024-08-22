import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";

export type Token = string
type StateType = {
    loggedIn: boolean
    authToken: Token | null
}
export const slice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        authToken: null,
    } as StateType,
    reducers: {
        setToken(state, action: PayloadAction<Token>) {
            state.authToken = action.payload
            state.loggedIn = true
            spotifyAPI._setToken(action.payload)
        }
    },
})
export const authReducer = slice.reducer
