import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SearchResult, spotifyAPI} from "../../api/spotifyAPI.ts";
import {AppRootStateType} from "../Application/types.ts";
import {CategoryObject} from "../../api/types/browseCategories.ts";
import {AxiosResponse} from "axios";
import type {RequestStatuses} from "../../api/types/common.ts";

export type Tabs = keyof SearchResult | 'all'

const browse = createAsyncThunk<SearchResult, { query: string, tab: Tabs }, {
    state: AppRootStateType,
    rejectValue: unknown
}>('browse', async ({query, tab}, thunkAPI) => {
    try {
        const response: AxiosResponse<SearchResult> = await spotifyAPI.search(tab, query)
        console.log(response)
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const fetchBrowseCategories = createAsyncThunk<CategoryObject[], undefined, {
    rejectValue: unknown
}>('browse/fetchBrowseCategories', async (_, thunkAPI) => {
    try {
        const response = await spotifyAPI.getBrowseCategories()
        console.log(response)
        return response.data.categories.items
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const fetchNewPortion = createAsyncThunk<SearchResult>('browse/fetchNewPortionTracks', async (_, thunkAPI) => {
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
            return thunkAPI.rejectWithValue(e)
        }
    }
})


export const asyncActions = {
    browse,
    fetchBrowseCategories,
    fetchNewPortion,
}
const slice = createSlice/**/(
    {
        name: 'browse',
        initialState: {
            activeTab: 'all' as Tabs,
            items: {} as SearchResult,
            query: null as string|null,
            loading: 'idle' as RequestStatuses,
            categories: [] as CategoryObject[],
        },
        reducers: {
            setActiveTab(state, action: PayloadAction<Tabs>) {
                state.activeTab = action.payload
            },
            clearItems(state) {
                state.items = {}
            },
            setQuery(state, action: PayloadAction<string>) {
                state.query = action.payload
            },
        },
        extraReducers: (builder) => {
            builder.addCase(browse.pending, (state) => {
                state.loading = 'loading'
            })
            builder
                .addCase(browse.fulfilled, (state, action) => {
                    state.loading = 'succeeded'
                    state.items = {...state.items, ...action.payload}
                })

            builder.addCase(fetchBrowseCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            builder.addCase(fetchNewPortion.fulfilled, (state, action) => {
                const activeTab = state.activeTab
                if(activeTab !== 'all'){
                    state.items = {
                        ...state.items,
                        [activeTab]: {
                            ...state.items[activeTab],
                            next: action.payload[activeTab]!.next,
                            items: [...state.items[activeTab]!.items, ...action.payload[activeTab]!.items]
                        }
                    }
                }
            });


        }
    }
)


export default slice