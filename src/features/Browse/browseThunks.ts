import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchResult, spotifyAPI} from "../../api/spotifyAPI.ts";
import {AppRootStateType} from "../Application/types.ts";
import {handleError} from "../../common/utils/error-utils.ts";
import {AxiosError, AxiosResponse} from "axios";
import {CategoryObject} from "../../api/types/browseCategories.ts";
import {Tabs} from "./browseSlice.ts";

export const browse = createAsyncThunk<SearchResult, { query: string, tab: Tabs }, {
    state: AppRootStateType,
    rejectValue: unknown
}>('browse', async ({query, tab}, thunkAPI) => {
    try {
        const response: AxiosResponse<SearchResult> = await spotifyAPI.search(tab, query)
        console.log(response)
        return response.data
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const fetchBrowseCategories = createAsyncThunk<CategoryObject[], undefined, {
    rejectValue: unknown
}>('browse/fetchBrowseCategories', async (_, thunkAPI) => {
    try {
        const response = await spotifyAPI.getBrowseCategories()
        console.log(response)
        return response.data.categories.items
    } catch (e) {
        return handleError(e as AxiosError, thunkAPI.rejectWithValue)
    }
})
export const fetchNewPortion = createAsyncThunk<SearchResult>('browse/fetchNewPortionTracks', async (_, thunkAPI) => {
    const store = thunkAPI.getState() as AppRootStateType
    const activeTab = store.browse.activeTab
    if (activeTab === 'all') {
        return thunkAPI.rejectWithValue('no active tab')
    }
    const link = store.browse.items[activeTab]!.next
    if (link) {
        try {
            const response = await spotifyAPI.getPortionOfItems(link)
            return response.data
        } catch (e) {
            return handleError(e as AxiosError, thunkAPI.rejectWithValue)
        }
    }
})
export const asyncActions = {
    browse,
    fetchBrowseCategories,
    fetchNewPortion,
}