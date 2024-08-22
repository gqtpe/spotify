import axios from "axios";

const spotifyAPIInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/', // ваш базовый URL для Spotify API
});



export const spotifyAPI = {
    _setToken(token: string){
        spotifyAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    async getMe() {
            return await spotifyAPIInstance.get('me');
    },
    async getSavedPlaylists() {
        return await spotifyAPIInstance.get('me/playlists')
    },
    async getSavedTracks() {
        return await spotifyAPIInstance.get<ResponseType<Item[]>>(`me/tracks`)
    }
}
type ResponsePaginationUrl = null | string

type ResponseType<T> = {
    href: string
    items: T
    limit: number
    next: ResponsePaginationUrl
    offset: number
    previous: ResponsePaginationUrl
    total: number
}





//common
type Restrictions = {
    reason: 'market'| 'product' | 'explicit'
}
type External_Urls = { [key: string]: string };
type SimplifiedArtist = {
    external_urls: External_Urls
    href: string
    id: string
    name: string
    type: 'artist'
    uri: string
}

//track
type Item = {
    added_at: string, // YYYY-MM-DDTHH:MM:SSZ
    track: Track

}
type Track = {
    album:Album
    artists: SimplifiedArtist[]
    availableMarkets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {[key: string]: string}
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
type Album = {
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
    artist: SimplifiedArtist[]
}

