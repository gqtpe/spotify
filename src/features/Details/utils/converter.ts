import {Playlist, PlaylistTrackObject} from "../../../api/types/playlist.ts";
import type Track from "../Items/Track/Track.tsx";
import type {ResponseType} from "../../../api/types/common.ts";



//user saved tracks to playlist type converter



const converter1 = (data: ResponseType<{ added_at: string; track: Track }[]>):Playlist =>{

    return {
        type: 'playlist',
        href: data.href,
        primary_color: null,
        collaborative: false,
        description: 'Your Saved Tracks',
        external_urls: {
            spotify: data.href
        },
        followers: {
            href: 'null',
            total: 0,
        },
        owner: {
            display_name: 'null',
            external_urls: {
                spotify: 'null'
            },
            href: 'null',
            id: 'null',
            type: 'user',
            uri: 'null',
        },
        public: false,
        uri: 'null',
        snapshot_id: 'null',
        name: 'Saved Tracks',
        images: [{
            url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
            height: 300,
            width: 300,
        }],
        id: 'liked-songs',
        tracks: {
            href: data.href,
            total: data.total,
            limit: data.limit,
            next: data.next,
            offset: data.offset,
            previous: data.previous,
            items: data.items.map((t): PlaylistTrackObject =>({
                added_at: t.added_at,
                added_by: {
                    external_urls: {
                        spotify: 'null'
                    },
                    href: 'null',
                    id: 'null',
                    type: 'user',
                    uri: 'null',
                },
                is_local: false,
                primary_color: '',
                track: t.track,
            }))
        }
    }
}


export {
    converter1
}