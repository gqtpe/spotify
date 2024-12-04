import type {SimplifiedAlbum} from "../../../../api/types/album.ts";
import type {Track} from "../../../../api/types/track.ts";
import {useEffect, useState} from "react";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";
import {RequestStatuses} from "../../../../api/types/common.ts";


interface ArtistDetails {
    albums: SimplifiedAlbum[];
    appears_on: SimplifiedAlbum[];
    topTracks: Track[];
    singles: SimplifiedAlbum[]
}

const useArtistDetails = (artistID: string) => {
    const [artistDetails, setArtistDetails] = useState<ArtistDetails|null>(null)
    const [loading, setLoading] = useState<RequestStatuses>('idle')
    useEffect(() => {
        const fetchArtistDetails = async () => {
            setLoading('loading')
            try {
                const response = await Promise.all([
                    // spotifyAPI.relatedArtists(artistID),
                    spotifyAPI.getArtistAlbums(artistID, "album"),
                    spotifyAPI.getArtistTopTracks(artistID),
                    spotifyAPI.getArtistAlbums(artistID, "appears_on"),
                    spotifyAPI.getArtistAlbums(artistID, "single"),
                ])
                setArtistDetails({
                    albums: response[0].data.items,
                    topTracks: response[1].data.tracks,
                    appears_on: response[2].data.items,
                    singles: response[3].data.items,
                })
                setLoading('succeeded')
            } catch (e) {
                setLoading('failed')
                console.warn(e)
            }
        }
        fetchArtistDetails()
    }, [artistID])

    return {artistDetails, loading}
}


export default useArtistDetails;