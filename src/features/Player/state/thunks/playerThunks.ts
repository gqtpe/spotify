import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI} from "@/api/spotifyAPI.ts";
import {handleError, throwMessage} from "@common/utils/error-utils.ts";
import {AxiosError} from "axios";
import type {RepeatState} from "../../types.ts";


const resume = createAsyncThunk<string, DeviceID>('player/resume', async (deviceID, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.resume(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const pause = createAsyncThunk<string, DeviceID>('player/pause', async (deviceID, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.pause(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const next = createAsyncThunk<string, DeviceID>('player/next', async (deviceID, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.next(deviceID);
        return res.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const previous = createAsyncThunk<string, DeviceID>('player/previous', async (deviceID, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.previous(deviceID)
        if(res.status === 200) {
            return res.data
        }
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const setShuffle = createAsyncThunk<{ state: boolean, id: string }, {
    state: boolean,
    deviceID?: string
}>('player/setShuffle', async ({state, deviceID}, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.setShuffle(state, deviceID);
        return {state, id: res.data}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const setRepeat = createAsyncThunk<{ repeat_state: RepeatState, id: string }, {
    repeat_state: RepeatState,
    deviceID: DeviceID
}>('player/setRepeat', async ({repeat_state, deviceID}, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.setRepeat(repeat_state, deviceID);
        return {repeat_state, id: res.data}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const seekPosition = createAsyncThunk<{ position_ms: number, response: string }, {
    position_ms: number,
    deviceID: DeviceID
}>('player/seekPosition', async ({position_ms, deviceID}, thunkAPI) => {
    try {
        if(!deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
        }
        const res = await spotifyAPI.seekPosition(position_ms, deviceID);
        return {response: res.data, position_ms}
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const play = createAsyncThunk<unknown, PlayParamTypes>('player/play', async (params, thunkAPI) => {
    try {
        if(!params.deviceID){
            return throwMessage('Playback successfully next', false,thunkAPI.rejectWithValue)
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

export default  {
    resume,
    pause,
    next,
    previous,
    setShuffle,
    setRepeat,
    seekPosition,
    play,
}
type DeviceID = string|null
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