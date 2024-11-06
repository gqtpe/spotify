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
const setShuffle = createAsyncThunk<{state: boolean, id: string}, {state: boolean, deviceID: string}>('player/setShuffle', async ({state, deviceID}, thunkAPI) => {
        try {
            const res = await spotifyAPI.setShuffle(state, deviceID);
            return {state, id: res.data}
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
const setRepeat = createAsyncThunk<{repeat_state: RepeatState, id: string}, {repeat_state: RepeatState, deviceID: string}>('player/setRepeat', async ({repeat_state, deviceID}, thunkAPI) => {
    try{
        const res = await spotifyAPI.setRepeat(repeat_state, deviceID);
        return {repeat_state, id: res.data}
    } catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})


export const asyncAction = {
    fetchPlaybackState,
    resume,
    pause,
    next,
    previous,
    setShuffle,
    setRepeat
}


const slice = createSlice({
    name: 'player',
    initialState: {
        item: null as Track | null,
        queue: [] as Array<Track>,
        activeDevice: null as ActiveDevice | null,
        isPlaying: false as boolean,
        shuffleState: false as boolean,
        repeatState: 'off' as RepeatState,
        progress: null as null | number,
    },
    reducers: {
        setIsPlaying(state, action) {
            state.isPlaying = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
            if(action.payload) {
                if (action.payload.device.is_active) {
                    state.activeDevice = {id: action.payload.device.id, name: action.payload.device.name}
                }
                state.isPlaying = action.payload.is_playing
                state.shuffleState = action.payload.shuffle_state
                state.repeatState = action.payload.repeat_state
                if(action.payload.item.type === 'track') {
                    state.item = action.payload.item
                }
            }
        })
        builder.addCase(setShuffle.fulfilled, (state, action) => {
            state.shuffleState = action.payload.state
        })
        builder.addCase(setRepeat.fulfilled, (state, action)=>{
            state.repeatState = action.payload.repeat_state
        })
    }
})
export type ActiveDevice = {
    id: string
    name: string
}


export default slice