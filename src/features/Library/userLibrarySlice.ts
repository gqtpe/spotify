import {createSlice} from "@reduxjs/toolkit";
import type {Album} from "../../api/types/album.ts";
import {SimplifiedPlaylist} from "../../api/types/playlist.ts";
import {fetchUserLibrary} from "./libraryThunks.ts";
export type LibraryStateType = {
    items: Array<SimplifiedPlaylist | Album>
    filter: LibraryFilterType
}
export type LibraryFilterType = 'all' | 'playlist' | 'album'
const slice = createSlice({
    name: 'userLibrary',
    initialState: {
        items: [],
        filter: 'all'
    } as LibraryStateType,
    reducers: {
        setFilter(state, action: { payload: LibraryFilterType }) {
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