import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyAPI, User} from "../../api/spotifyAPI.ts";
import {initializeApp} from "../Application/appSlice.ts";

export type Token = string
// type StateType = {
//     loggedIn: boolean
//     authToken: Token | null
//     user: null | User
// }


export const slice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false as boolean,
        authToken: null as Token | null,
        user: null as null | User,
    },
    reducers: {
        setToken(state, action: PayloadAction<Token>) {
            state.authToken = action.payload
            state.loggedIn = true
            spotifyAPI._setToken(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
        })
    }
})
