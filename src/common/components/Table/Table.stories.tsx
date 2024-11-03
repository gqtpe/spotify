import {Meta, StoryObj} from "@storybook/react";
import Table from "./Table.tsx";
import {Track} from "../../../api/types/track.ts";
import {SimplifiedAlbum} from "../../../api/types/album.ts";


const meta: Meta<typeof Table> = {
    title: 'common/Table',
    component: Table,
    parameters: {
        backgrounds: {
            values: [
                {name: 'Dark', value: '#121212'},
            ],
            default: 'Dark'
        }
    },
}
export default meta

type Story = StoryObj<typeof Table>

const album: SimplifiedAlbum = {
    id: '1',
    name: 'Album 1',
    album_type: 'album',
    artists: [],
    type: 'album',
    images: [{
        url: 'https://picsum.photos/id/237/200/300',
        width: 200,
        height: 300
    }],
    release_date: '2022-01-01',
    total_tracks: 1,
    external_urls: {
        spotify: 'https://open.spotify.com/album/1'
    },
    href: 'https://open.spotify.com/album/1',
    uri: 'https://open.spotify.com/album/1',
    available_markets:[],
    restrictions: {
        reason: 'market'
    },
    release_date_precision: 'day',
}
const tracks: Track[] = [
    {
        id: '1',
        album: album,
        name: 'Track 1',
        type: 'track',
        artists: [],
        duration_ms: 1000,
        external_urls: {
            spotify: 'https://open.spotify.com/track/1'
        },
        href: 'https://open.spotify.com/track/1',
        is_playable: true,
        preview_url: 'https://open.spotify.com/track/1',
        uri: 'https://open.spotify.com/track/1',
        explicit: false,
        available_markets: [],
        disc_number: 1,
        track_number: 1,
        restrictions: {
            reason: 'market'
        },
        is_local: false,
        external_ids: {},
        linked_from: {
            external_urls: {
                spotify: 'https://open.spotify.com/track/1'
            },
            href: 'https://open.spotify.com/track/1',
            id: '1',
            type: 'track',
            uri: 'https://open.spotify.com/track/1'
        },
        popularity: 0
    },
]
export const Example: Story = {
    args: {
        data: tracks,
        enableRowNumbering: true
    },
    render: (args) => {
        return <Table {...args}/>
    }
}