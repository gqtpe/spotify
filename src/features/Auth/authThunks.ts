import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI, User} from "../../api/spotifyAPI.ts";

const getMe = createAsyncThunk<User, void>('auth/getMe', async (_, {rejectWithValue}) => {
    try {
        const response = await spotifyAPI.getMe()
        console.log('me:', response.data)
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const asyncActions = {
    getMe,
}
