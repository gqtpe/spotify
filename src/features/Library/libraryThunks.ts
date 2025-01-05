import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {SimplifiedPlaylist} from "../../api/types/playlist.ts";
import type {Album} from "../../api/types/album.ts";

export const fetchUserLibrary = createAsyncThunk<Array<SimplifiedPlaylist | Album>>('userLibrary/fetchUserLibrary', async (_, thunkAPI) => {
    try {
        const [r1, r2] = await Promise.all([
            spotifyAPI.getSavedPlaylists(),
            spotifyAPI.getSavedAlbums(),
        ]);
        const playlists = r1.data.items || [];
        const albums = r2.data.items.map(album => album.album) || [];
        return [...playlists, ...albums]
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
const saveItem = createAsyncThunk<undefined, {
    type: ToggleSaveItemTypes,
    ids: string[]
}>('userLibrary/saveItem', async (params, thunkAPI) => {
    const {type, ids} = params
    try {
        const response = await spotifyAPI.saveItem(type, ids)
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

const removeItem = createAsyncThunk<undefined, {
    type:ToggleSaveItemTypes,
    ids: string[]
}>('userLibrary/saveItem', async (params, thunkAPI) => {
    const {type, ids} = params
    try {
        const response = await spotifyAPI.removeItem(type, ids)
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
type ToggleSaveItemTypes = 'track' | 'album' | 'artist' | 'user'
const toggleItemSave = createAsyncThunk<{ saved: boolean }, {
    type: ToggleSaveItemTypes,
    ids: string[]
},{rejectValue: unknown}>('userLibrary/toggleItemSave', async (params, thunkAPI) => {
    try{
        const isSaved = await spotifyAPI.checkIsItemSaved(params.type, params.ids)
        if(isSaved.data[0]){
            await spotifyAPI.removeItem(params.type, params.ids)
        }else{
            await spotifyAPI.saveItem(params.type, params.ids)
        }
        return {saved: !isSaved.data[0]}
    }catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

const toggleSavePlaylist = createAsyncThunk<{ saved: boolean }, {
    playlist_id: string
}>('userLibrary/toggleSavePlaylist', async (params, thunkAPI) => {
    try {
        const isSaved = await spotifyAPI.isSavedPlaylist(params.playlist_id)
        if (isSaved.data[0]) {
            await spotifyAPI.removePlaylist(params.playlist_id)
        } else {
            await spotifyAPI.savePlaylist(params.playlist_id)
        }
        return {saved: !isSaved.data[0]}
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const asyncActions = {
    fetchUserLibrary,
    saveItem,
    removeItem,
    toggleSavePlaylist,
    toggleItemSave
}