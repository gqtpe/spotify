import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SpotifyTokenResponse, User} from "../../api/spotifyAPI.ts";
import {appActions} from "../Application";
import {asyncActions} from "./authThunks.ts";

export type Token = string


export const slice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false as boolean,
        authToken: null as Token | null,
        refreshToken: null as Token | null,
        expirationTime: null as number | null,
        user: null as null | User
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(appActions.initializeApp.fulfilled, (state, action: PayloadAction<SpotifyTokenResponse | null>) => {
            if (action.payload?.access_token) {
                state.authToken = action.payload!.access_token
                state.refreshToken = action.payload!.refresh_token
                state.expirationTime = action.payload!.expires_in
                state.loggedIn = true
            }
        })
        builder.addCase(asyncActions.getMe.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
        })
    }
})
