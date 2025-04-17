import {createAsyncThunk} from "@reduxjs/toolkit";
import {spotifyAPI} from "@/api/spotifyAPI.ts";
import type {SimplifiedPlaylist} from "@/api/types/playlist.ts";
import type {Album} from "@/api/types/album.ts";
import {handleError, throwMessage} from "@common/utils/error-utils.ts";
import {AxiosError} from "axios";

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
        return handleError(e as AxiosError,thunkAPI.rejectWithValue)
    }
})
const saveItem = createAsyncThunk<undefined, {
    type: ToggleSaveItemTypes,
    ids: string[]
}>('userLibrary/saveItem', async (params, thunkAPI) => {
    const {type, ids} = params
    try {
        const response = await spotifyAPI.saveItem(type, ids)
        throwMessage('Item saved', true)
        return response.data
    } catch (e) {
        return handleError(e as AxiosError,thunkAPI.rejectWithValue)
    }
})

const removeItem = createAsyncThunk<undefined, {
    type:ToggleSaveItemTypes,
    ids: string[]
}>('userLibrary/saveItem', async (params, thunkAPI) => {
    const {type, ids} = params
    try {
        const response = await spotifyAPI.removeItem(type, ids)
        throwMessage('Item removed', true)
        return response.data
    } catch (e) {
        return handleError(e as AxiosError,thunkAPI.rejectWithValue)
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
            await thunkAPI.dispatch(removeItem(params))
        }else{
            await thunkAPI.dispatch(saveItem(params))
        }
        return {saved: !isSaved.data[0]}
    }catch (e) {
        return handleError(e as AxiosError,thunkAPI.rejectWithValue)
    }
})

const toggleSavePlaylist = createAsyncThunk<{ saved: boolean }, {
    playlist_id: string
}>('userLibrary/toggleSavePlaylist', async (params, thunkAPI) => {
    try {
        const isSaved = await spotifyAPI.isSavedPlaylist(params.playlist_id)
        if (isSaved.data[0]) {
            await spotifyAPI.removePlaylist(params.playlist_id)
            throwMessage('Item removed', true)
        } else {
            await spotifyAPI.savePlaylist(params.playlist_id)
            throwMessage('Item saved', true)
        }
        return {saved: !isSaved.data[0]}
    } catch (e) {
        return handleError(e as AxiosError,thunkAPI.rejectWithValue)
    }
})

export const asyncActions = {
    fetchUserLibrary,
    saveItem,
    removeItem,
    toggleSavePlaylist,
    toggleItemSave
}