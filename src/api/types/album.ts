import {
    External_Urls,
    Images,
    ResponseType,
    Restrictions,
    AvailableMarkets,
    ReleaseDatePrecision,
    Copyrights, External_Ids
} from "./common.ts";
import {SimplifiedTrack} from "./track.ts";

import {SimplifiedArtist} from "./artist.ts";

interface BaseAlbum {
    album_type: AlbumType
    total_tracks: number
    available_markets: AvailableMarkets
    external_urls: External_Urls
    href: string //a link to get full details
    id: string,
    images:Images
    name: string
    release_date: string //"1981-12"
    release_date_precision: ReleaseDatePrecision
    restrictions: Restrictions
    type: 'album'
    uri: string
    artists: SimplifiedArtist[]
}

type SimplifiedAlbum = BaseAlbum

type AlbumType = 'album' | 'single' | 'compilation'

interface Album extends BaseAlbum{
    tracks: ResponseType<SimplifiedTrack[]>
    copyrights: Copyrights
    external_ids: External_Ids
    genres: string[]
    label: string
    popularity: number
}

export type {
    Album,
    SimplifiedAlbum
}