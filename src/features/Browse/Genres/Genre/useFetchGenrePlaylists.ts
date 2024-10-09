import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";
import type {SimplifiedPlaylist} from "../../../../api/types/playlist.ts";
import type {ResponseType} from "../../../../api/types/common.ts";


export const useFetchGenrePlaylists = () => {
    const [item, setItem] = useState<{message: string, playlists: ResponseType<SimplifiedPlaylist[]>}>()
    const param = useParams<{ id: string }>()

    useEffect(() => {
        if(param.id){
            const fetchPlaylists = async () => {
                try {
                    const response = await spotifyAPI.getCategoryPlaylists(param.id!)
                    setItem(response.data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchPlaylists()
        }

    }, [param.id])

    return {item}
}