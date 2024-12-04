import {FC, useEffect, useState} from "react";
import type {Playlist} from "../../../../api/types/playlist.ts";
import TracksTable from "../../../../common/components/Table/Table.tsx";
import {columns} from "./columns.tsx";
import "./Playlist.scss";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {usePlayAction} from "../../../Player";
import {FaPlay} from "react-icons/fa6";
import IconButton from "../../../../common/components/IconButton/IconButton.tsx";
import {IoIosAddCircleOutline, IoIosCheckmarkCircle} from "react-icons/io";
import useSave from "../../../Library/useSave/useSave.ts";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";


const Playlist: FC<{ item: Playlist }> = ({item}) => {
    const play = usePlayAction()
    const [isSaved, setIsSaved] = useState(false)
    const save = useSave('playlist')
    console.log(item)
    const handleClick = async () => {
        const state = await save(item.id)
        console.log(state)
        setIsSaved(state);
    }
    useEffect(() => {
        const fetchIsSaved = async () => {
            const response = await spotifyAPI.isSavedPlaylist(item.id)
            setIsSaved(response.data[0])
        }
        fetchIsSaved()
    }, []);
    return (
        <div className="detailed-page playlist">
            <div className="detailed-page__header playlist__header">
                <div className="detailed-page__image playlist__image">
                    <img src={item?.images[0]?.url} alt={item?.name}/>
                </div>
                <div className="playlist__description">
                    <Typography variant='subtitle1'>Playlist</Typography>
                    <Typography className="playlist__title" variant='h1'>{item?.name}</Typography>
                    <Typography variant='subtitle1' sx={{color: 'var(--text400)'}}>{item?.description}</Typography>
                    <div className="playlist__stats">
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-100)'}}>{item?.owner.display_name}</Typography>•
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-400)'}}>{item?.followers.total} saves</Typography>•
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-400)'}}>{item?.tracks.total} tracks</Typography>
                    </div>
                </div>
            </div>
            <div className="detailed-page__actions playlist__actions">
                <IconButton fz={24} onClick={() => play({type: 'playlist', context_uri: item?.uri})}>
                    <FaPlay/>
                </IconButton>
                <IconButton fz={24} variant="icon" onClick={handleClick}>
                    {isSaved ? <IoIosCheckmarkCircle/> : <IoIosAddCircleOutline/>}
                </IconButton>
            </div>
            <div className="playlist__content">
                <div className="detailed-page__table playlist__table ">
                    <TracksTable columns={columns} data={item?.tracks.items} enableRowNumbering/>
                </div>
            </div>

        </div>
    );
};

export default Playlist;
