import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {handleError, throwMessage} from "../../common/utils/error-utils.ts";
import {AxiosError} from "axios";
import type {Device, PlayerBackState, RepeatState} from "./types.ts";

export const fetchPlaybackState = createAsyncThunk<PlayerBackState, undefined>('player/fetchPlaybackState', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getPlaybackState();
        if (res.status === 200) {
            return res.data
        }
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const fetchCurrentlyPlaying = createAsyncThunk<PlayerBackState, undefined, {
    rejectValue: unknown
}>('player/fetchCurrentlyPlaying', async (_, thunkAPI) => {
    try {
        const response = await spotifyAPI.getCurrentlyPlaying()
        if (response.status === 200) {
            return response.data
        }
        return thunkAPI.rejectWithValue(response.statusText)
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const resume = createAsyncThunk<string, string>('player/resume', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.resume(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const pause = createAsyncThunk<string, string>('player/pause', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.pause(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const next = createAsyncThunk<string, string>('player/next', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.next(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const previous = createAsyncThunk<string, string>('player/previous', async (deviceID, thunkAPI) => {
    try {
        const res = await spotifyAPI.previous(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const setShuffle = createAsyncThunk<{ state: boolean, id: string }, {
    state: boolean,
    deviceID: string
}>('player/setShuffle', async ({state, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.setShuffle(state, deviceID);
        return {state, id: res.data}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const setRepeat = createAsyncThunk<{ repeat_state: RepeatState, id: string }, {
    repeat_state: RepeatState,
    deviceID: string
}>('player/setRepeat', async ({repeat_state, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.setRepeat(repeat_state, deviceID);
        return {repeat_state, id: res.data}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const seekPosition = createAsyncThunk<{ position_ms: number, response: string }, {
    position_ms: number,
    deviceID: string
}>('player/seekPosition', async ({position_ms, deviceID}, thunkAPI) => {
    try {
        const res = await spotifyAPI.seekPosition(position_ms, deviceID);
        return {response: res.data, position_ms}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const play = createAsyncThunk<unknown, PlayParamTypes>('player/play', async (params, thunkAPI) => {
    try {
        if (!params.deviceID) {
            const message = 'Device not found'
            return throwMessage(message, false, thunkAPI.rejectWithValue)
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
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const fetchDevices = createAsyncThunk<Device[], undefined>('player/fetchDevices', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getAvailableDevices();
        if(res.data.devices.length === 0){
            throwMessage('No device found')
        }
        return res.data.devices
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
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
    fetchDevices
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