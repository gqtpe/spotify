import type {SimplifiedPlaylist} from "../../api/types/playlist.ts";
import type {SimplifiedAlbum} from "../../api/types/album.ts";
import type {Artist} from "../../api/types/artist.ts";


type ArgTypes = {
    item: SimplifiedPlaylist|SimplifiedAlbum|Artist
}
export default function getSubtitleLink({item}: ArgTypes) {
    switch (item.type) {
        case 'playlist':
            return `/user/${item.owner.id}`;
        case "album":
            return `/artist/${item.artists[0].id}`;
        case "artist":
            return undefined;
    }
}