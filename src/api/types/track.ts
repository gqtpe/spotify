import {External_Urls, LinkedFrom, Restrictions} from "./common.ts";
import {SimplifiedAlbum} from "./album.ts";
import {SimplifiedArtist} from "./artist.ts";

interface BaseTrack {
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: External_Urls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: LinkedFrom;
    restrictions: Restrictions;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
}

type SimplifiedTrack = BaseTrack

interface Track extends BaseTrack {
    album: SimplifiedAlbum
    external_ids: { [key: string]: string };
    popularity: number;

}

export type {
    Track,
    SimplifiedTrack
}