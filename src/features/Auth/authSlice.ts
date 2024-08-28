import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SpotifyTokenResponse, spotifyTokenService, User} from "../../api/spotifyAPI.ts";
import {initializeApp} from "../Application/appSlice.ts";
import {setItem} from "../../utils/localStorage.ts";

export type Token = string

export const fetchSpotifyToken = createAsyncThunk<SpotifyTokenResponse, string>('auth/fetchSpotifyToken', async (code, {rejectWithValue}) => {
    try {
        const response = await spotifyTokenService.getToken(code)
        console.log(response.data)
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})


export const asyncActions = {
    fetchSpotifyToken
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
        builder.addCase(initializeApp.fulfilled, (state, action: PayloadAction<SpotifyTokenResponse|null>) => {
            if (state.authToken) {
                state.authToken = action.payload!.access_token
                state.refreshToken = action.payload!.refresh_token
                state.expirationTime = action.payload!.expires_in
                state.loggedIn = true
            }
        })
        builder.addCase(fetchSpotifyToken.fulfilled, (state, action: PayloadAction<SpotifyTokenResponse>) => {
            const {access_token, refresh_token, expires_in} = action.payload;
            state.authToken = access_token
            state.refreshToken = refresh_token
            state.loggedIn = true
            state.expirationTime = Date.now() + expires_in * 1000

            setItem('auth_token', access_token);
            setItem('refresh_token', refresh_token);
            setItem('expiration_time', (Date.now() + expires_in * 1000).toString());
            setItem('token_type', action.payload.token_type);
            setItem('scope', action.payload.scope);
        })
    }
})
