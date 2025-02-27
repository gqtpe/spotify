import {AppRootStateType} from "../Application/types.ts";

export const selectQuery = (state: AppRootStateType) => state.browse.query

export const selectActiveTab = (state: AppRootStateType) => state.browse.activeTab

export const selectLoading = (state: AppRootStateType) => state.browse.loading

export const selectCategories = (state: AppRootStateType) => state.browse.categories

export const selectPlaylists = (state: AppRootStateType) => state.browse.items.playlists

export const selectTracks = (state: AppRootStateType) => state.browse.items.tracks

export const selectAlbums = (state: AppRootStateType) => state.browse.items.albums

export const selectArtists = (state: AppRootStateType) => state.browse.items.artists

export const selectEpisodes = (state: AppRootStateType) => state.browse.items.episodes

export const selectAudiobooks = (state: AppRootStateType) => state.browse.items.audiobooks

export const selectShows = (state: AppRootStateType) => state.browse.items.shows