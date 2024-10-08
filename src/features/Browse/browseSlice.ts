import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SearchResult, spotifyAPI} from "../../api/spotifyAPI.ts";
import {AppRootStateType} from "../Application/types.ts";
import {tabs} from "./tabs.ts";
import {CategoryObject} from "../../api/types/browseCategories.ts";
import {AxiosResponse} from "axios";

export type Tabs = 'all' | 'track' | 'playlist' | 'album' | 'artist' | 'show' | 'episode' | 'audiobook'

const browse = createAsyncThunk<SearchResult, { query: string, tab:Tabs }, { state: AppRootStateType, rejectValue: unknown}>('browse', async ({query, tab}, thunkAPI) => {
    let activeTab:string = tab
    if(activeTab === 'all') {
        activeTab = tabs.slice(1).join('%2C')
    }
    try {
        const response: AxiosResponse<SearchResult> = await spotifyAPI.search(activeTab, query)
        console.log(response)
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const fetchBrowseCategories = createAsyncThunk<CategoryObject[], undefined, {rejectValue: unknown}>('browse/fetchBrowseCategories', async (_, thunkAPI) => {
    try {
        const response = await spotifyAPI.getBrowseCategories()
        console.log(response)
        return response.data.categories.items
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})


export const asyncActions = {
    browse,
    fetchBrowseCategories
}

const slice = createSlice(
    {
        name: 'browse',
        initialState: {
            activeTab: 'all' as Tabs,
            items: {} as SearchResult,
            categories: [] as CategoryObject[],
        },
        reducers: {
            setActiveTab(state, action: PayloadAction<Tabs>) {
                state.activeTab = action.payload
            },
            clearItems(state) {
                state.items = {}
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(browse.fulfilled, (state, action) => {
                    state.items = {...state.items, ...action.payload}
                })
            builder.addCase(fetchBrowseCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
        }
    }
)


export default slice