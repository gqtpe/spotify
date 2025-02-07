import {PlayerBackState} from "../types.ts";


const playbackMock: PlayerBackState = {
    device: {
        id: "device_12345",
        is_active: true,
        is_private_session: false,
        is_restricted: false,
        name: "User's Device",
        type: "computer",
        volume_percent: 75,
        supports_volume:false,
    },
    repeat_state: "off",
    shuffle_state: false,
    context: null,
    timestamp: Date.now(),
    progress_ms: 120000,
    is_playing: true,
    item: {
        artists: [{
            id: "artist_123",
            name: "Mock Artist",
            external_urls: { spotify: "https://open.spotify.com/artist/mock_artist" },
            href: "https://api.spotify.com/v1/artists/artist_123",
            type: "artist",
            uri: "spotify:artist:mock_artist"
        }],
        available_markets: ["US", "CA"],
        disc_number: 1,
        duration_ms: 240000,
        explicit: false,
        external_urls: { spotify: "https://open.spotify.com/track/mock_track" },
        href: "https://api.spotify.com/v1/tracks/track_67890",
        id: "track_67890",
        is_playable: true,
        linked_from: {
            href: 'https://open.spotify.com/track/mock_track_67890',
            uri: 'https://open.spotify.com/track/mock_track_67890',
            type: "track",
            id: 'track_67890',
            external_urls: { spotify: "https://open.spotify.com/track/mock_track_67890",}
        },
        restrictions: {
            reason: 'explicit'
        },
        name: "Mock Track",
        preview_url: "https://p.scdn.co/mp3-preview/mock_preview",
        track_number: 5,
        type: "track",
        uri: "spotify:track:mock_track",
        is_local: false,
        album: {
            album_type: "album",
            total_tracks: 10,
            available_markets: ["US", "CA"],
            external_urls: { spotify: "https://open.spotify.com/album/mock_album" },
            href: "https://api.spotify.com/v1/albums/album_456",
            id: "album_456",
            images: [{ url: "https://via.placeholder.com/150", height: 300, width:300}],
            name: "Mock Album",
            release_date: "1981-12",
            release_date_precision: "month",
            restrictions: {reason:'explicit'},
            type: "album",
            uri: "spotify:album:mock_album",
            artists: [{
                id: "artist_123",
                name: "Mock Artist",
                external_urls: { spotify: "https://open.spotify.com/artist/mock_artist" },
                href: "https://api.spotify.com/v1/artists/artist_123",
                type: "artist",
                uri: "spotify:artist:mock_artist"
            }]
        },
        external_ids: { isrc: "USMO12345678" },
        popularity: 75
    },
    actions: {
        interrupting_playback: false,
        pausing: true,
        resuming: true,
        seeking: true,
        skipping_next: true,
        skipping_prev: true,
        toggling_repeat_context: true,
        toggling_shuffle: true,
        toggling_repeat_track: true,
        transferring_playback: false
    },
    currently_playing_type: "track"
}


export {
    playbackMock
}