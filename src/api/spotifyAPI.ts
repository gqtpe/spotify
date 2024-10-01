import axios from "axios";
import {PlayerBackState} from "../features/Player";

const spotifyAPIInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/', // ваш базовый URL для Spotify API
});
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}


const tokenServiceInstance = axios.create({
    baseURL: 'https://accounts.spotify.com/'
})


export const spotifyTokenService = {
    async getToken(code: string) {
        return await tokenServiceInstance.post<SpotifyTokenResponse>('api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }), {
            headers: {
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            spotifyAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
            return res
        })
    },
    async getRefreshToken(refreshToken: string) {
        return tokenServiceInstance.post<SpotifyTokenResponse>('api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            }
        })
    }
}

export const spotifyAPI = {
    _setToken(token: string) {
        spotifyAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    //==========curr user
    async getMe() {
        return await spotifyAPIInstance.get<User>('me');
    },
    async getSavedPlaylists() {
        return await spotifyAPIInstance.get<ResponseType<SimplifiedPlaylist[]>>('me/playlists')
    },
    async getSavedAlbums() {
        return await spotifyAPIInstance.get<ResponseType<{added_at:string; album: SavedAlbumObject}[]>>('me/albums')
    },
    async getSavedArtists() {
        return await spotifyAPIInstance.get<ResponseType<Artist[]>>('me/following?type=artist')
    },
    async getSavedTracks() {
        return await spotifyAPIInstance.get<ResponseType<{added_at:string; track: Track}[]>>(`me/tracks`)
    },
    async getPlaybackState() {
        return await spotifyAPIInstance.get<PlayerBackState>('me/player')
    },
    //==========
    //==========search
    async search(tab: string, query: string) {
        return await spotifyAPIInstance.get<SearchResult>(`search?q=${query}&type=${tab}`)
    }
}

type ResponsePaginationUrl = null | string
export type ResponseType<T> = {
    href: string
    items: T
    limit: number
    next: ResponsePaginationUrl
    offset: number
    previous: ResponsePaginationUrl
    total: number
}
//common
export type Restrictions = {
    reason: 'market' | 'product' | 'explicit'
}
export type External_Urls = { [key: string]: string };
export type Images = {
    height: number
    url: string
    width: number
}[]
export type Copyrigths = {
    text: string
    type: string
}[]
export type SimplifiedArtist = {
    external_urls: External_Urls
    href: string
    id: string
    name: string
    type: 'artist'
    uri: string
}
export type SimplifiedUser = {
    display_name: string
    external_urls: External_Urls
    href: string
    id: string
    type: 'user'
    uri: string
}
export type SimplifiedPlaylist = {
    collaborative: boolean
    description: string
    external_urls: External_Urls
    href: string
    id: string
    images: Images
    name: string
    owner: SimplifiedUser
    primary_color: null
    public: boolean
    snapshot_id: string
    tracks: { href: string; total: number }
    type: 'playlist'
    uri: string
}
export type SimplifiedTrack = {
    artists: SimplifiedArtist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: External_Urls
    href: string
    id: string
    is_playable: string
    linked_from: { external_urls: External_Urls; href: string; id: string; type: string; uri: string }
    restrictions: Restrictions
    name: string
    preview_url: string
    track_number: number
    type: 'track'
    uri: string
    is_local: boolean
}
export interface SimplifiedAlbum {
    album_type: AlbumType
    total_tracks: number
    availableMarkets: string[]
    external_urls: External_Urls
    href: string //a link to get full details
    id: string,
    images: {
        url: string
        height: number
        width: number
    }[]
    name: string
    release_date: string //"1981-12"
    release_date_precision: 'day' | 'year' | 'month'
    restrictions: Restrictions
    type: 'album'
    uri: string
    artists: SimplifiedArtist[]
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
//track
export type Track = {
    album: Album
    artists: SimplifiedArtist[]
    availableMarkets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: { [key: string]: string }
    external_urls: External_Urls
    href: string
    id: string
    is_playable: boolean //is playable in the given market
    restrictions: Restrictions
    name: string
    popularity: number
    preview_url: string | null
    track_number: number
    type: 'track'
    uri: string
}

//album
type AlbumType = 'album' | 'single' | 'compilation'

export interface Album {
    album_type: string
    artists: SimplifiedArtist[]
    available_markets: string[]
    external_urls: External_Urls
    href: string
    id: string
    images: Images
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions
    total_tracks: number
    type: 'album'
    uri: string

}

export type SavedAlbumObject = {
    album_type: AlbumType
    artists: SimplifiedArtist[]
    available_markets: string[]
    copyrights: Copyrigths
    external_ids: {
        [key: string]: string
    }
    external_urls: External_Urls
    genres: string[]
    href: string
    id: string
    images: Images
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    tracks: ResponseType<SimplifiedTrack[]>
    type: 'album'
    uri: string
}
//playlist
export type Playlist = {
    collaborative: boolean
    description: string
    external_urls: External_Urls
    followers: {
        href: string
        total: number
    }
    href: string
    id: string
    images: Images
    name: string
    owner: {
        external_urls: External_Urls
        followers: {
            href: string
            total: number
        }
        href: string
        id: string
        type: 'user'
        uri: string
        display_name: string
    }
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        total: number
    }
    type: 'playlist'
    uri: string
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
//search
export type SearchResult = {
    albums: ResponseType<SimplifiedAlbum[]>
    artists: ResponseType<Artist[]>
    audiobooks: ResponseType<Audiobook[]>
    episodes: ResponseType<Episode[]>
    playlists: ResponseType<Playlist[]>
    shows: ResponseType<Shows[]>
    tracks: ResponseType<Track[]>
}
//artist
export type Artist = {
    external_urls: External_Urls
    followers: {
        href: string
        total: number
    }
    genres: string[]
    href: string
    id: string
    images: {
        url: string
        height: number
        width: number
    }[]
    name: string
    popularity: number
    type: 'artist'
    uri: string
}
//audiobooks
export type Audiobook = {
    authors: { name: string }[]
    available_markets: string[]
    copyrights: Copyrigths
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
    copyrights: Copyrigths
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