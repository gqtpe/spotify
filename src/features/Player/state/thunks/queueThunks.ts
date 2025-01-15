import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";
import type {Track} from "../../../../api/types/track.ts";
import {handleError, throwMessage} from "../../../../common/utils/error-utils.ts";
import {AxiosError} from "axios";


export const fetchQueue = createAsyncThunk<Track[]>('player/fetchQueue', async (_, thunkAPI) =>{
    try{
        const res = await spotifyAPI.fetchUserQueue()
        return res.data.queue
    }catch(e){
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const addToQueue = createAsyncThunk<undefined,{uri: string,deviceID: string}>('player/fetchQueue', async (params, thunkAPI)=>{
    try{
        await spotifyAPI.addItemToUserQueue(params.uri, params.deviceID);
        throwMessage('Item added to queue',true)
        await thunkAPI.dispatch(fetchQueue())
    }catch(e){
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})

export default {
    fetchQueue,
    addToQueue,
}