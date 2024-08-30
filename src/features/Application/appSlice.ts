import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getItem, setItem} from "../../utils/localStorage.ts";
import {spotifyAPI, SpotifyTokenResponse, spotifyTokenService} from "../../api/spotifyAPI.ts";

export const initializeApp = createAsyncThunk<SpotifyTokenResponse|null>(
    'app/initializeApp',
    async (_, thunkAPI) => {
        debugger;

        const authToken = getItem('auth_token')
        const refreshToken = getItem('refresh_token')
        const expirationTime = getItem('expiration_time')
        const tokenType = getItem('token_type')
        const scopes = getItem('scope')
        if (expirationTime && authToken && refreshToken) {
            const currentTime = Date.now()
            if (currentTime >= Number(expirationTime)) {
                try {
                    const response = await spotifyTokenService.getRefreshToken(refreshToken)
                    const newExpirationTime = Date.now() + response.data.expires_in * 1000
                    setItem('auth_token', response.data.access_token)
                    console.log(response.data.refresh_token)
                    setItem('refresh_token', response.data.refresh_token)
                    setItem('expiration_time', newExpirationTime.toString())
                    setItem('token_type', response.data.token_type)
                    setItem('scope', response.data.scope)
                    return response.data

                } catch (e) {
                    return thunkAPI.rejectWithValue(e)
                }
            } else {
                spotifyAPI._setToken(authToken)
                return {
                    access_token: authToken,
                    refresh_token: refreshToken,
                    expires_in: Number(expirationTime),
                    token_type: tokenType,
                    scope: scopes,
                } as SpotifyTokenResponse
            }
        }
        return null

    }
)
export const asyncActions = {
    initializeApp
}

export const slice = createSlice(
    {
        name: 'app',
        initialState: {
            error: null as null | string,
            isInitialized: false as boolean
        },
        reducers: {
            setAppLoading: (state, action: PayloadAction<boolean>) => {
                state.isInitialized = action.payload
            },
            setAppError: (state, action: PayloadAction<string | null>) => {
                state.error = action.payload
            }
        },
        extraReducers: (builder) => {
            builder.addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            builder.addCase(initializeApp.rejected, (state) => {
                state.isInitialized = false
            })
        },
    }
)