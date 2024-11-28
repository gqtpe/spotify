import {External_Urls, Images, ResponseType} from "./common.ts";
import {Track} from "./track.ts";
import {SimplifiedUser} from "../spotifyAPI.ts";

interface BasePlaylist {
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

    type: 'playlist'
    uri: string
}


interface SimplifiedPlaylist extends BasePlaylist {
    tracks: {
        href: string
        total: number
    }
}

//playlist
interface Playlist extends BasePlaylist {
    external_urls: External_Urls
    followers: {
        href: string
        total: number
    }
    snapshot_id: string
    tracks: ResponseType<PlaylistTrackObject[]>
}

export type PlaylistTrackObject = {
    added_at: string
    added_by: {
        external_urls: External_Urls
        href: string
        id: string
        type: 'user'
        uri: string
    }
    is_local: boolean
    primary_color: string
    // track: Track | Episode
    track: Track,
}


export type {
    SimplifiedPlaylist,
    Playlist
}