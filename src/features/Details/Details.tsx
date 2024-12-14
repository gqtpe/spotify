import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {User as UserType} from "../../api/spotifyAPI.ts";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {AxiosError} from "axios";
import Playlist from "./Items/Playlist/Playlist.tsx";
import Album from "./Items/Album/Album.tsx";
import Artist from "./Items/Artist/Artist.tsx";
import Track from "./Items/Track/Track.tsx"
import type {Album as AlbumType} from "../../api/types/album.ts";
import type {Artist as ArtistType} from "../../api/types/artist.ts";
import type {Playlist as PlaylistType} from "../../api/types/playlist.ts";
import type {Track as TrackType} from "../../api/types/track.ts";
import './Items/styles.scss'
import User from "./Items/User/User.tsx";
import {RequestStatuses} from "../../api/types/common.ts";


export type DetailedItemType = 'album' | 'playlist' | 'track' | 'artist' | 'user';
type ItemType = PlaylistType | ArtistType | TrackType | AlbumType | UserType
//todo: replace loader with skeleton(create slice for detailed page)
const Details: FC = () => {
    console.log('details ')
    const params = useParams<{ id: string, type: DetailedItemType }>();
    const [item, setItem] = useState<ItemType | null>(null);
    const [loading, setLoading] = useState<RequestStatuses>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading('loading')
            try {
                if (params.type && params.id) {
                if (params.type == 'collection') {
                    const response = await spotifyAPI.getSavedTracks();
                    setItem(playlist)
                    setLoading('succeeded')
                } else if (params.type && params.id) {
                    const response = await spotifyAPI.getDetailedItem(params.id, params.type);
                    setItem(response.data);
                    setLoading('succeeded')
                }
            } catch (err) {
                const error = err as AxiosError
                setError(error.message)
                setLoading('failed')
            }
        };
        fetchItem();
    }, [params.id, params.type]);

    if (error) {
        return <div>{error}</div>;
    }
    if (loading !== 'succeeded') {
        return <div className="loader"/>

    }
    switch (item!.type) {
        case 'playlist':
            return <Playlist item={item as PlaylistType}/>
        case 'album':
            return <Album item={item as AlbumType}/>
        case 'artist':
            return <Artist item={item as ArtistType}/>
        case 'track':
            return <Track item={item as TrackType}/>
        case 'user':
            return <User item={item as UserType}/>
    }

};

export default Details;
