import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {User as UserType} from "../../api/spotifyAPI.ts";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {AxiosError} from "axios";
import Playlist from "./Items/Playlist/Playlist.tsx";
import Album from "./Items/Album/Album.tsx";
import Artist from "./Items/Artist/Artist.tsx";
import Track from "./Items/Track.tsx"
import type {Album as AlbumType} from "../../api/types/album.ts";
import type {Artist as ArtistType} from "../../api/types/artist.ts";
import type {Playlist as PlaylistType} from "../../api/types/playlist.ts";
import type {Track as TrackType} from "../../api/types/track.ts";
import './Items/styles.scss'
import User from "./Items/User/User.tsx";


export type DetailedItemType = 'album' | 'playlist' | 'track' | 'artist' | 'user';
type ItemType = PlaylistType | ArtistType | TrackType | AlbumType | UserType
const Details: FC = () => {
    console.log('details ')
    const params = useParams<{ id: string, type: DetailedItemType }>();
    const [item, setItem] = useState<ItemType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            console.log(item)
            try {
                if (params.type && params.id) {
                    const response = await spotifyAPI.getDetailedItem(params.id, params.type);
                    setItem(response.data);
                }
            } catch (err) {
                const error = err as AxiosError
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [params.id, params.type]);

    if (loading && !item) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
