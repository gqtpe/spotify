import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Episode, spotifyAPI} from "../../api/spotifyAPI.ts";
import {Track} from "../../api/types/track.ts";


const fetchPlaybackState = createAsyncThunk<PlayerBackState, undefined>('player/fetchPlaybackState', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getPlaybackState();
        if(res.status === 200){
            return res.data
        }
        return thunkAPI.rejectWithValue(res.statusText)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})


const resume = createAsyncThunk('player/resume', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.resume();
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const pause = createAsyncThunk('player/pause', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.pause();
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const next = createAsyncThunk('player/next', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.next();
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const previous = createAsyncThunk('player/previous', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.previous();
        return res.data
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
    reducers: {
        setIsPlaying(state, action) {
            if(state.playback) state.playback.is_playing = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
            state.playback = action.payload
        })
    }
})


export default slice