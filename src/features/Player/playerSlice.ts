import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Episode, spotifyAPI, Track} from "../../api/spotifyAPI.ts";


const fetchPlaybackState = createAsyncThunk<Track|Episode|null, undefined>('player/fetchPlaybackState', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getPlaybackState();
        return res.data.item
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})


export const asyncAction = {
    fetchPlaybackState
}


const slice = createSlice({
    name: 'player',
    initialState: {
        item: null as null | Track | Episode,
        queue: [] as Array<Track>,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
            state.item = action.payload
        })
    }
})


export default slice