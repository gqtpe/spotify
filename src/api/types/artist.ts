import {External_Urls, Images} from "./common.ts";


interface BaseArtist {
    external_urls: External_Urls
    href: string
    id: string
    name: string
    type: 'artist'
    uri: string
}

type SimplifiedArtist = BaseArtist

interface Artist extends BaseArtist{
    followers: {
        href: string
        total: number
    }
    genres: string[]
    images: Images
    popularity: number
    uri: string
}



export type {
    SimplifiedArtist,
    Artist
}