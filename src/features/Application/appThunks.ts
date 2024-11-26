import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI, SpotifyTokenResponse, spotifyTokenService} from "../../api/spotifyAPI.ts";
import {getItem, setItem} from "../../common/utils/localStorage.ts";
import {authActions} from "../Auth";
import {userLibraryActions} from "../Library";

export const initializeApp = createAsyncThunk<SpotifyTokenResponse | null>(
    'app/initializeApp',
    async (_, thunkAPI) => {

        let authToken = getItem('auth_token')
        const refreshToken = getItem('refresh_token')
        let expirationTime = getItem('expiration_time')
        let tokenType = getItem('token_type')
        let scopes = getItem('scope')
        if (expirationTime && authToken && refreshToken) {
            const currentTime = Date.now()
            if (currentTime >= Number(expirationTime)) {
                try {
                    const response = await spotifyTokenService.getRefreshToken(refreshToken)

                    const newExpirationTime = (Date.now() + response.data.expires_in * 1000).toString()

                    authToken = response.data.access_token
                    expirationTime = newExpirationTime
                    tokenType = response.data.token_type
                    scopes = response.data.scope

                    setItem('auth_token', authToken)
                    setItem('refresh_token', refreshToken)
                    setItem('expiration_time', newExpirationTime)
                    setItem('token_type', tokenType)
                    setItem('scope', scopes)
                } catch (e) {
                    return thunkAPI.rejectWithValue(e)
                }
            }
        }
        if (authToken) {
            spotifyAPI._setToken(authToken)
            try {
                await thunkAPI.dispatch(authActions.getMe())
                await thunkAPI.dispatch(userLibraryActions.fetchUserLibrary())
            } catch (e) {
                return thunkAPI.rejectWithValue(e)
            }
            return {
                access_token: authToken,
                refresh_token: refreshToken,
                expires_in: Number(expirationTime),
                token_type: tokenType,
                scope: scopes,
            } as SpotifyTokenResponse
        } else {
            return null
        }


    }
)
export default { initializeApp }