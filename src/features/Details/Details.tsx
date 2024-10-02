import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    type Album as AlbumType,
    type Artist as ArtistType,
    type Playlist as PlaylistType,
    spotifyAPI,
    type Track as TrackType
} from "../../api/spotifyAPI.ts";
import {AxiosError} from "axios";
import Playlist from "./Items/Playlist.tsx";
import Album from "./Items/Album.tsx";
import Artist from "./Items/Artist.tsx";
import Track from "./Items/Track.tsx"

export type DetailedItemType = 'album' | 'playlist' | 'track' | 'artist';
const Details: FC = () => {
    const params = useParams<{ id: string, type: DetailedItemType }>();
    const [item, setItem] = useState<PlaylistType | ArtistType | TrackType | AlbumType | null>(null); // Adjust the type as needed
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                if (params.type && params.id) {
                    debugger;
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
    }, [params.id]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            {params.type === 'playlist' && <Playlist item={item}/>}
            {params.type === 'album' && <Album item={item}/>}
            {params.type === 'artist' && <Artist item={item}/>}
            {params.type === 'track' && <Track item={item}/>}
        </div>
    );
};

export default Details;
