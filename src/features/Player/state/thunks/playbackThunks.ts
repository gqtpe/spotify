import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Device, PlayerBackState} from "../../types.ts";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";
import {handleError, throwMessage} from "../../../../common/utils/error-utils.ts";
import {AxiosError} from "axios";

const fetchPlaybackState = createAsyncThunk<PlayerBackState, undefined>('player/fetchPlaybackState', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getPlaybackState();
        if (res.status === 200) {
            return res.data
        }
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
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
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const fetchDevices = createAsyncThunk<Device[], undefined>('player/fetchDevices', async (_, thunkAPI) => {
    try {
        const res = await spotifyAPI.getAvailableDevices();
        if (res.data.devices.length === 0) {
            throwMessage('No device found')
        }
        return res.data.devices
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
const transferPlayback = createAsyncThunk<string, string>('player/transferPlayback', async (deviceID, thunkAPI) => {
    try {
        await spotifyAPI.transferPlayback(deviceID)
        throwMessage('Playback successfully transferred', true)
        thunkAPI.dispatch(fetchDevices())
        return deviceID
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})

export default {
    fetchPlaybackState,
    fetchCurrentlyPlaying,
    transferPlayback,
    fetchDevices,
}


