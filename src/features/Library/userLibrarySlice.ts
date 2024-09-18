import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SavedAlbumObject, SimplifiedPlaylist, spotifyAPI} from "../../api/spotifyAPI.ts";


const fetchUserLibrary = createAsyncThunk<Array<SimplifiedPlaylist | SavedAlbumObject>>('userLibrary/fetchUserLibrary', async (_, thunkAPI) => {
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


export const asyncActions = {
    fetchUserLibrary
}
type Filter = 'all' | 'playlist' | 'album'
const slice = createSlice({
    name: 'userLibrary',
    initialState: {
        items: [] as Array<SimplifiedPlaylist | SavedAlbumObject>,
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