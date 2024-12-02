import {createSlice} from "@reduxjs/toolkit";
import type {Album} from "../../api/types/album.ts";
import {SimplifiedPlaylist} from "../../api/types/playlist.ts";
import {fetchUserLibrary} from "./libraryThunks.ts";

type Filter = 'all' | 'playlist' | 'album'
const slice = createSlice({
    name: 'userLibrary',
    initialState: {
        items: [] as Array<SimplifiedPlaylist | Album>,
        filter: 'all' as Filter
    },
    reducers: {
        setFilter(state, action: { payload: Filter }) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLibrary.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})


export default slice