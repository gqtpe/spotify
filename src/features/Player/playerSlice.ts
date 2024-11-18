import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {Track} from "../../api/types/track.ts";
import type {PlayerBackState, RepeatState} from "./types.ts";
import {RequestStatuses} from "../../api/types/common.ts";


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
const fetchCurrentlyPlaying = createAsyncThunk<PlayerBackState, undefined, {
    rejectValue: unknown
}>('player/fetchCurrentlyPlaying', async (_, thunkAPI) => {
    try {
        const response = await spotifyAPI.getCurrentlyPlaying()
        if (response.status === 200) {
            return response.data
        }
        return thunkAPI.rejectWithValue(response.statusText)
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
const setShuffle = createAsyncThunk<{ state: boolean, id: string }, {
    state: boolean,
    deviceID: string
}>('player/setShuffle', async ({state, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.setShuffle(state, deviceID);
        return {state, id: res.data}
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const setRepeat = createAsyncThunk<{ repeat_state: RepeatState, id: string }, {
    repeat_state: RepeatState,
    deviceID: string
}>('player/setRepeat', async ({repeat_state, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.setRepeat(repeat_state, deviceID);
        return {repeat_state, id: res.data}
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const seekPosition = createAsyncThunk<{ position_ms: number, response: string }, {
    position_ms: number,
    deviceID: string
}>('player/seekPosition', async ({position_ms, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.seekPosition(position_ms, deviceID);
        return {response: res.data, position_ms}
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

const play = createAsyncThunk<unknown, PlayParamTypes>('player/play', async (params, thunkAPI) => {
    try {
        if (params.deviceID === undefined) {
            return thunkAPI.rejectWithValue({message: 'deviceID is undefined'})
        }
        let curr;
        if (params.type === "track" || params.type === "episode") {
            curr = {
                deviceID: params.deviceID,
                uris: params.uris,
                position: params.position ? params.position : undefined,
            }
        } else {
            curr = {
                deviceID: params.deviceID,
                ...params,
            }
            if (params.type === 'album' || params.type === 'playlist') {
                curr = {
                    ...curr,
                    offset: params.offset
                }
            }
        }
        const res = await spotifyAPI.play({...curr});
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
export const asyncAction = {
    fetchPlaybackState,
    fetchCurrentlyPlaying,
    resume,
    pause,
    next,
    previous,
    setShuffle,
    setRepeat,
    seekPosition,
    play,
}


const slice = createSlice({
    name: 'player',
    initialState: {
        playback: {
            activeDevice: null as ActiveDevice | null,
            isPlaying: false as boolean,
            shuffleState: false as boolean,
            repeatState: 'off' as RepeatState,
            progress: null as null | number,
        },
        item: null as Track | null,
        queue: [] as Array<Track>,
        playbackLoading: 'idle' as RequestStatuses
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPlaybackState.pending, state => {
            state.playbackLoading = 'loading'
        })
        builder.addCase(fetchPlaybackState.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.device.is_active) {
                    state.playback.activeDevice = {id: action.payload.device.id, name: action.payload.device.name}
                }
                state.playback.isPlaying = action.payload.is_playing
                state.playback.shuffleState = action.payload.shuffle_state
                state.playback.repeatState = action.payload.repeat_state
                state.playback.progress = action.payload.progress_ms
                if (action.payload.item.type === 'track') {
                    state.item = action.payload.item
                }
                state.playbackLoading = 'succeeded'
            }
        })
        builder.addCase(fetchCurrentlyPlaying.fulfilled, (state, action: PayloadAction<PlayerBackState>) => {
            if (action.payload) {
                if (action.payload.item.type === 'track') {
                    state.item = action.payload.item
                    state.playback.progress = action.payload.progress_ms
                    state.playback.isPlaying = action.payload.is_playing
                }
            }
        })


        builder.addCase(setShuffle.fulfilled, (state, action) => {
            state.playback.shuffleState = action.payload.state
        })
        builder.addCase(setRepeat.fulfilled, (state, action) => {
            state.playback.repeatState = action.payload.repeat_state
        })
        builder.addCase(seekPosition.fulfilled, (state, action: PayloadAction<{
            position_ms: number,
            response: string
        }>) => {
            state.playback.progress = action.payload.position_ms
        })
        builder.addCase(pause.fulfilled, (state) => {
            state.playback.isPlaying = false
        })
        builder.addCase(resume.fulfilled, (state) => {
            state.playback.isPlaying = true
        })
    }
})
export type ActiveDevice = {
    id: string
    name: string
}
export type PlayParamTypes =
    | {
    type: 'playlist' | 'album'
    deviceID?: string
    context_uri: string
    offset?: {
        position: number
    }
} | {
    deviceID?: string
    type: 'track' | 'episode'
    uris?: string[]
    position?: number
} | {
    deviceID?: string
    type: 'artist' | 'show'
    context_uri: string
}

export default slice