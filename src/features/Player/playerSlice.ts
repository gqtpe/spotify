import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {Track} from "../../api/types/track.ts";
import type {PlayerBackState, RepeatState} from "./types.ts";


const fetchPlaybackState = createAsyncThunk<PlayerBackState, undefined>('player/fetchPlaybackState', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getPlaybackState();
        if (res.status === 200) {
            return res.data
        }
        return thunkAPI.rejectWithValue(res.statusText)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})


const resume = createAsyncThunk<string, string>('player/resume', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.resume(deviceID);
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const pause = createAsyncThunk<string, string>('player/pause', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.pause(deviceID);
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const next = createAsyncThunk<string, string>('player/next', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.next(deviceID);
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const previous = createAsyncThunk<string, string>('player/previous', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.previous(deviceID);
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const asyncAction = {
    fetchPlaybackState,
    resume,
    pause,
    next,
    previous
}


const slice = createSlice({
    name: 'player',
    initialState: {
        item: null as Track | null,
        queue: [] as Array<Track>,
        activeDevice: null as ActiveDevice | null,
        isPlaying: false as boolean,
        shuffleState: false as boolean,
        repeatState: 'off' as RepeatState
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