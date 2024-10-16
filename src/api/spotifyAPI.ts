import axios from "axios";
import {PlayerBackState} from "../features/Player";
import {DetailedItemType} from "../features/Details/Details.tsx";
import {Copyrights, External_Urls, Images, ResponseType, Restrictions} from "./types/common.ts";
import {Track} from "./types/track.ts";
import {Album, SimplifiedAlbum} from "./types/album.ts";
import {Artist} from "./types/artist.ts";
import {Playlist, SimplifiedPlaylist} from "./types/playlist.ts";
import {CategoryObject} from "./types/browseCategories.ts";
import {Device} from "../features/Player/types.ts";

const spotifyAPIInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/', // ваш базовый URL для Spotify API
});
const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;
export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}
//todo:  move remaining types to separate files

const tokenServiceInstance = axios.create({
    baseURL: authEndpoint
})


export const spotifyTokenService = {
    async getRefreshToken(refreshToken: string) {
        return tokenServiceInstance.post<SpotifyTokenResponse>('/refresh', {refresh_token: refreshToken})
    }
}

export const spotifyAPI = {
    _setToken(token: string) {
        spotifyAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    //==========me
    async getMe() {
        return await spotifyAPIInstance.get<User>('me');
    },
    async getSavedPlaylists() {
        return await spotifyAPIInstance.get<ResponseType<SimplifiedPlaylist[]>>('me/playlists')
    },
    async getSavedAlbums() {
        return await spotifyAPIInstance.get<ResponseType<{added_at:string; album: Album}[]>>('me/albums')
    },
    async getSavedArtists() {
        return await spotifyAPIInstance.get<ResponseType<Artist[]>>('me/following?type=artist')
    },
    async getSavedTracks() {
        return await spotifyAPIInstance.get<ResponseType<{added_at:string; track: Track}[]>>(`me/tracks`)
    },
    //==========player
    async getPlaybackState() {
        return await spotifyAPIInstance.get<PlayerBackState>('me/player')
    },
    async getCurrentlyPlaying() {
        return await spotifyAPIInstance.get<PlayerBackState>('me/player/currently-playing')
    },
    //device
    async getAvailableDevices() {
        return await spotifyAPIInstance.get<Device[]>('me/player/devices')
    },

    //actions
    async resume(){
      return await spotifyAPIInstance.put('me/player/play')
    },
    async pause(){
        return await spotifyAPIInstance.put('me/player/pause')
    },
    async next(){
        return await spotifyAPIInstance.put('me/player/next')
    },
    async previous(){
        return await spotifyAPIInstance.put('me/player/previous')
    },
    //==========getDetailedItem
    async getDetailedItem(id: string, type: DetailedItemType) {
        return await spotifyAPIInstance.get<Playlist|Artist|Album|Track>(`${type}s/${id}`)
    },
    //==========browseCategory
    async getCategoryPlaylists(id: string) {
        return await spotifyAPIInstance.get<{message:string, playlists: ResponseType<SimplifiedPlaylist[]>}>('browse/categories/' + id + '/playlists')
    },
    async getBrowseCategories() {
        return await spotifyAPIInstance.get<{categories: ResponseType<CategoryObject[]>}>('browse/categories')
    },
    //==========search
    async search(tab: string, query: string) {
        return await spotifyAPIInstance.get<SearchResult>(`search?q=${query}&type=${tab}`)
    }
}


//search
export type SearchResult = {
    albums?: ResponseType<SimplifiedAlbum[]>
    artists?: ResponseType<Artist[]>
    audiobooks?: ResponseType<Audiobook[]>
    episodes?: ResponseType<Episode[]>
    playlists?: ResponseType<SimplifiedPlaylist[]>
    shows?: ResponseType<Shows[]>
    tracks?: ResponseType<Track[]>
}
//common

export type SimplifiedUser = {
display_name: string
external_urls: External_Urls
href: string
id: string
type: 'user'
uri: string
}
export type SimplifiedChapter = {
audio_preview_url: string
available_markets: string[]
chapter_number: number
description: string
html_description: string
duration_ms: number
explicit: boolean
id: string
images: Images
is_playable: boolean
languages: string[]
name: string
release_date: string
release_date_precision: string
resume_point: {
fully_played: boolean
resume_position_ms: number
}
type: 'episode'
uri: string
restrictions: Restrictions
}


//user
export type User = {
country: string
display_name: string
email: string
explicit_content: {
filter_enabled: boolean
filter_locked: boolean
}
external_urls: External_Urls
followers: {
href: string
total: number
}

href: string
id: string
images: {
url: string
height: number
width: number
}[]
product: string
type: 'user'
uri: string
}
//audiobooks
export type Audiobook = {
    authors: { name: string }[]
    available_markets: string[]
    copyrights: Copyrights
    description: string
    html_description: string
    edition: string
    explicit: boolean
    external_urls: External_Urls
    href: string
    id: string
    images: {
        url: string
        height: number
        width: number
    }[]
    language: string
    media_type: string
    name: string
    narrators: { name: string }[]
    publisher: string
    type: 'audiobook'
    uri: string
    total_chapter: number
    chapters: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: SimplifiedChapter[]
    }
}
//episode
export type Episode = {
    audio_preview_url: string
    description: string
    duration_ms: number
    explicit: boolean
    external_urls: External_Urls
    href: string
    html_description: string
    id: string
    images: {
        url: string
        height: number
        width: number
    }[]
    is_externally_hosted: boolean
    is_playable: boolean
    language: string
    languages: string[]
    name: string
    release_date: string
    release_date_precision: string
    type: 'episode'
}
//shows
export type Shows = {
    available_markets: string[]
    copyrights: Copyrights
    description: string
    explicit: boolean
    external_urls: External_Urls
    href: string
    html_description: string
    id: string
    images: Images
    is_externally_hosted: boolean
    languages: string[]
    media_type: string
    name: string
    publisher: string
    total_episodes: number
    type: 'show'
    uri: string
}
//