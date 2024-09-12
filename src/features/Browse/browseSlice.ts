import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SearchResult, spotifyAPI} from "../../api/spotifyAPI.ts";
import {AppRootStateType} from "../Application/types.ts";
import {tabs} from "./tabs.ts";

export type Tabs = 'all' | 'track' | 'playlist' | 'album' | 'artist' | 'show' | 'episode' | 'audiobook'

const browse = createAsyncThunk<any, { query: string, tab:Tabs }, { state: AppRootStateType }>('browse', async ({query, tab}, thunkAPI) => {
    let activeTab:string = tab
    let preview = false
    if(activeTab === 'all') {
        activeTab = tabs.slice(1).join('%2C')
        preview = true
    }
    try {
        const response = await spotifyAPI.search(activeTab, query, preview)
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
            setActiveTab(state, action: PayloadAction<Tabs>) {
                state.activeTab = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(browse.fulfilled, (state, action) => {
                    state.items = {...state.items, ...action.payload}
                })
        }
    }
)


export default slice