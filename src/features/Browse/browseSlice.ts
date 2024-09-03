import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SearchResult, spotifyAPI} from "../../api/spotifyAPI.ts";
import {AppRootStateType} from "../Application/types.ts";
import {tabs} from "./tabs.ts";

export type Tabs = 'all' | 'track' | 'playlist' | 'album' | 'artist' | 'show' | 'episode' | 'audiobook'

const browse = createAsyncThunk<any, string, { state: AppRootStateType }>('browse', async (query, thunkAPI) => {
    const activeTab = thunkAPI.getState().browse.activeTab
    let tab:string = activeTab
    if(tab === 'all') {
        tab = tabs.slice(1).join('%2C')
    }
    try {
        const response = await spotifyAPI.search(tab, query)
        console.log(response)
        return response.data
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})


export const asyncActions = {
    browse
}

const slice = createSlice(
    {
        name: 'browse',
        initialState: {
            activeTab: 'all' as Tabs,
            items: {
            } as SearchResult
        },
        reducers: {
            setActiveTab: (state, action: PayloadAction<Tabs>) => {
                state.activeTab = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(browse.fulfilled, (state, action) => {
                    state.items = action.payload
                })
        }
    }
)


export default slice