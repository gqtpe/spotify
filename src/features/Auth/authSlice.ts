import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyAPI, SpotifyTokenResponse, User} from "../../api/spotifyAPI.ts";
import {initializeApp} from "../Application/appSlice.ts";

export type Token = string

export const getMe = createAsyncThunk<User, void>('auth/getMe', async (_, {rejectWithValue}) => {
    try {
        const response = await spotifyAPI.getMe()
        console.log('me:', response.data)
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const asyncActions = {
    getMe
}

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
        builder.addCase(initializeApp.fulfilled, (state, action: PayloadAction<SpotifyTokenResponse | null>) => {
            if (action.payload?.access_token) {
                state.authToken = action.payload!.access_token
                state.refreshToken = action.payload!.refresh_token
                state.expirationTime = action.payload!.expires_in
                state.loggedIn = true
            }
        })
        builder.addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
        })
    }
})
