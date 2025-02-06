import {browseActions, browseReducer} from "../";
import {beforeEach, describe, expect, test} from 'vitest'
import type {BrowseStateType, Tabs} from "../browseSlice.ts";
import {RequestStatuses} from "../../../api/types/common.ts";
import {SearchResult} from "../../../api/spotifyAPI.ts";

const {clearItems, browse, setQuery, setActiveTab} = browseActions;
let startState: BrowseStateType;
//
beforeEach(() => {
    startState = {
        activeTab: 'all',
        items: {},
        query: null,
        loading: 'idle',
        categories: [],
    }
})
describe("browseSlice synchronous actions", () => {
    describe('setActiveTab', () => {
        test('should change activeTab to tracks', () => {
            const payload: Tabs = 'tracks';
            const endState = browseReducer(startState, setActiveTab(payload))
            expect(endState.activeTab).toBe(payload)
        })
        test('should change activeTab to all', () => {
            const payload1: Tabs = 'tracks';
            const payload2: Tabs = 'all';
            const state1 = browseReducer(startState, setActiveTab(payload1))
            expect(state1.activeTab).toBe(payload1)
            const endState = browseReducer(startState, setActiveTab(payload2))
            expect(endState.activeTab).toBe(payload2)
        })
    })
    describe('clearItems', () => {
        test('should set items to empty object', () => {
            const modifiedState: BrowseStateType = {
                ...startState,
                items: {
                    tracks: {
                        href: 'href',
                        next: 'next',
                        limit: 1000,
                        offset: 0,
                        previous: 'prev',
                        total: 89888,
                        items: [
                            {
                                external_ids: {},
                                available_markets:[],
                                disc_number: 9,
                                uri: 'usr',
                                href: 'trackhref',
                                type: 'track',
                                restrictions: {
                                    reason:"explicit",
                                },
                                explicit: false,
                                external_urls: {},
                                duration_ms: 2838923,
                                is_local: false,

                                is_playable: true,
                                track_number: 33,
                                linked_from: {
                                    href: 'https://href',
                                    uri: 'https://href',
                                    type: 'track',
                                    external_urls: {},
                                    id: 'sdkfja;sldfkjas'
                                },
                                preview_url: 'sfsafsdf',
                                id: "1234567890abcdef",
                                name: "Track Name",
                                artists: [
                                    {
                                        id: "artist-id",
                                        name: "Artist Name",
                                        type: 'artist',
                                        external_urls: {},
                                        href: 'https://href',
                                        uri: 'https://href',
                                    }
                                ],
                                album: {
                                    restrictions: {
                                        reason: 'explicit'
                                    },
                                    album_type: "album",
                                    artists: [
                                        {
                                            id: "artist-id",
                                            name: "Artist Name",
                                            href: "https://api.spotify.com/v1/artists/artist-id",
                                            external_urls: {
                                                spotify: "https://open.spotify.com/artist/artist-id"
                                            },
                                            uri: 'swss',
                                            type: 'artist'
                                        }
                                    ],
                                    available_markets: ["US", "CA", "GB"],
                                    external_urls: {
                                        spotify: "https://open.spotify.com/album/album-id",
                                    },
                                    href: "https://api.spotify.com/v1/albums/album-id",
                                    id: "album-id",
                                    images: [
                                        {
                                            url: "https://link-to-image.jpg",
                                            height: 300,
                                            width: 300
                                        }
                                    ],
                                    name: "Album Name",
                                    release_date: "2025-01-01",
                                    release_date_precision: "day",
                                    total_tracks: 10,
                                    type: "album",
                                    uri: "spotify:album:album-id",
                                },
                                popularity: 80,
                            }
                        ]
                    }
                }
            };

            console.log(modifiedState);

            const endState = browseReducer(modifiedState, clearItems())
        expect(Object.keys(endState.items).length).toBe(0)
    })
})
    describe('setQuery',()=>{
        test('should set query string for query string', () => {
            const newValue = 'query'
            const endState = browseReducer(startState, setQuery(newValue))
            expect(endState.query).toBe(newValue)
        })
    })
})
describe("browseSlice async actions", () => {
    describe("browse", () => {
        const browsePayload:{ query: string, tab: Tabs } = {tab:'artists', query:'sabrina carpenter'}
        const response: SearchResult = {
            tracks: {
                href: 'href',
                next: 'next',
                limit: 1000,
                offset: 0,
                previous: 'prev',
                total: 89888,
                items: [
                    {
                        external_ids: {},
                        available_markets:[],
                        disc_number: 9,
                        uri: 'usr',
                        href: 'trackhref',
                        type: 'track',
                        restrictions: {
                            reason:"explicit",
                        },
                        explicit: false,
                        external_urls: {},
                        duration_ms: 2838923,
                        is_local: false,

                        is_playable: true,
                        track_number: 33,
                        linked_from: {
                            href: 'https://href',
                            uri: 'https://href',
                            type: 'track',
                            external_urls: {},
                            id: 'sdkfja;sldfkjas'
                        },
                        preview_url: 'sfsafsdf',
                        id: "1234567890abcdef",
                        name: "Track Name",
                        artists: [
                            {
                                id: "artist-id",
                                name: "Artist Name",
                                type: 'artist',
                                external_urls: {},
                                href: 'https://href',
                                uri: 'https://href',
                            }
                        ],
                        album: {
                            restrictions: {
                                reason: 'explicit'
                            },
                            album_type: "album",
                            artists: [
                                {
                                    id: "artist-id",
                                    name: "Artist Name",
                                    href: "https://api.spotify.com/v1/artists/artist-id",
                                    external_urls: {
                                        spotify: "https://open.spotify.com/artist/artist-id"
                                    },
                                    uri: 'swss',
                                    type: 'artist'
                                }
                            ],
                            available_markets: ["US", "CA", "GB"],
                            external_urls: {
                                spotify: "https://open.spotify.com/album/album-id",
                            },
                            href: "https://api.spotify.com/v1/albums/album-id",
                            id: "album-id",
                            images: [
                                {
                                    url: "https://link-to-image.jpg",
                                    height: 300,
                                    width: 300
                                }
                            ],
                            name: "Album Name",
                            release_date: "2025-01-01",
                            release_date_precision: "day",
                            total_tracks: 10,
                            type: "album",
                            uri: "spotify:album:album-id",
                        },
                        popularity: 80,
                    }
                ]
            }
        }

        test('browse.fulfilled have to set items, and change loading state', () =>{
            const endState = browseReducer(startState, browse.fulfilled(response,'request-id', browsePayload))
            expect(endState.items.tracks?.items[0].uri).toBe(response.tracks?.items[0].uri)
            expect(endState.items.tracks?.items[0].name).toBe(response.tracks?.items[0].name)
            expect(endState.items.tracks?.items[0].id).toBe(response.tracks?.items[0].id)
            expect(endState.loading).toBe('succeeded' as RequestStatuses)
        })

        test('browse.pending have to change loading state',()=>{
            const endState = browseReducer(startState, browse.pending('request-id',browsePayload))
            expect(endState.loading).toBe('loading' as RequestStatuses)
        })
    });
    //todo: fetchNewPortion tests
});
