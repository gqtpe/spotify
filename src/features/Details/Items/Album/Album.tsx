import {FC, useCallback, useEffect, useState} from "react";
import "./Album.scss";
import type {Album} from "../../../../api/types/album.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import TracksTable from "../../../../common/components/Table/Table.tsx";
import {columns} from "./columns.tsx";
import {usePlayAction} from "../../../Player";
import IconButton from "../../../../common/components/IconButton/IconButton.tsx";
import {FaPlay} from "react-icons/fa6";
import {IoIosAddCircleOutline, IoIosCheckmarkCircle} from "react-icons/io";
import useSave from "../../../Library/useSave/useSave.ts";
import {spotifyAPI} from "../../../../api/spotifyAPI.ts";


const Album: FC<{ item: Album }> = ({item}) => {
    const play = usePlayAction()
    //save
    const save = useSave(item.type)
    const toggleSave = useCallback( async () => {
        const saved = await save([item.id])
        setIsSaved(saved)
    },[save])
    const [isSaved, setIsSaved] = useState(false)
    useEffect(() => {
        const fetchIsSaved = async () => {
            const response = await spotifyAPI.checkIsItemSaved(item.type, [item.id])
            debugger;
            setIsSaved(response.data[0])
        }
        fetchIsSaved()
    }, []);


    return (
        <div className="album">
            <div className="album__header detailed-page-header">
                <div className="album__image detailed-page-image">
                    <img src={item?.images[0].url} alt={item?.name}/>
                </div>
                <div className="album__description">
                    <Typography variant='subtitle1'>Album</Typography>
                    <Typography className="album__title" variant='h1'>{item.name}</Typography>
                    <div className="album__details">
                        <Typography variant='subtitle1'>
                            {item.artists[0].name}
                        </Typography>•
                        <Typography variant='subtitle1' sx={{color: 'var(--text400)'}}>
                            {item.release_date.slice(0, 4)}
                        </Typography>
                        •
                        <Typography sx={{color: 'var(--text400)'}} variant='subtitle1'>
                            {item.total_tracks} tracks
                        </Typography>

                    </div>
                </div>
            </div>
            <div className="album__content">
                <div className="album__actions detailed-actions">
                    <IconButton fz={24} onClick={() => play({type: 'album', context_uri: item?.uri})}>
                        <FaPlay/>
                    </IconButton>
                    <IconButton fz={24} variant="icon" onClick={toggleSave}>
                        {isSaved ? <IoIosCheckmarkCircle/> : <IoIosAddCircleOutline/>}
                    </IconButton>
                </div>
                <div className="album__table detailed-page-table">
                    <TracksTable columns={columns} data={item?.tracks.items} enableRowNumbering/>

                </div>
            </div>

        </div>
    );
};

export default Album;
