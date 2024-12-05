import type { SimplifiedPlaylist } from "../../api/types/playlist.ts";
import type {Artist} from "../../api/types/artist.ts";
import type {SimplifiedAlbum} from "../../api/types/album.ts";


type ArgTypes = {
    item: SimplifiedPlaylist|SimplifiedAlbum|Artist
}
export default function getSubtitleForCard({item}:ArgTypes) {
    switch (item.type) {
        case 'playlist':
            return 'By ' + item.owner.display_name;
        case "album":
            return item.release_date.slice(0, 4) + ' - ' + item.artists.map(artist => artist.name).join(', ');
        case "artist":
            return 'Artist';
    }
}