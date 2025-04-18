import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SearchResult} from "../../api/spotifyAPI.ts";
import {CategoryObject} from "../../api/types/browseCategories.ts";
import type {RequestStatuses} from "../../api/types/common.ts";
import {browse, fetchBrowseCategories, fetchNewPortion} from "./browseThunks.ts";

export type Tabs = keyof SearchResult | 'all'
export type BrowseStateType = {
    activeTab:  Tabs,
    items:  SearchResult,
    query: string|null,
    loading: RequestStatuses,
    categories:  CategoryObject[],
}

const slice = createSlice/**/(
    {
        name: 'browse',
        initialState: {
            activeTab: 'all',
            items: {},
            query: null ,
            loading: 'idle',
            categories: [],
        } as BrowseStateType,
        reducers: {
            setActiveTab(state, action: PayloadAction<Tabs>) {
                state.activeTab = action.payload
            },
            clearItems(state) {
                state.items = {}
            },
            setQuery(state, action: PayloadAction<string|null>) {
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