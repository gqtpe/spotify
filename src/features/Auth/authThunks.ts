import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI, User} from "../../api/spotifyAPI.ts";
import {handleError} from "../../common/utils/error-utils.ts";
import {AxiosError} from "axios";

const getMe = createAsyncThunk<User, void>('auth/getMe', async (_, {rejectWithValue}) => {
    try {
        const response = await spotifyAPI.getMe()
        console.log('me:', response.data)
        return response.data
    } catch (e) {
        return handleError(e as AxiosError, rejectWithValue)
    }
})

export const asyncActions = {
    getMe,
}
