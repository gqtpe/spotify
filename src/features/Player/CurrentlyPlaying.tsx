import {FC, useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../Application/hooks";
import {spotifyAPI} from "@/api/spotifyAPI.ts";
import useSave from "@/features/Library/useSave/useSave.ts";
import {playerSelectors} from "./index.ts";
import footerStyles from "./Footer.module.scss";

import "@/common/components/Cards/Card/Card.scss";
import Card from "@/common/components/Cards/Card/Card.tsx";
import Skeleton from "@/common/components/Skeleton/Skeleton.tsx";
import Typography from "@/common/components/Typography/Typography.tsx";
import IconButton from "@/common/components/IconButton/IconButton.tsx";
import {IoIosAddCircleOutline, IoIosCheckmarkCircle} from "react-icons/io";
import {cutFrom30} from "../Browse/utils/cutFrom30.ts";


const CurrentlyPlaying: FC = () => {

    const item = useAppSelector(playerSelectors.selectPlaybackItem)
    const playbackLoading = useAppSelector(playerSelectors.selectPlaybackLoading)

    const save = useSave('track')
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const handleClick = useCallback(() => {
        if (item) {
            save([item.id])
            setIsSaved(prevState => !prevState)
        }
    }, [item, save])

    useEffect(() => {
        if (item) {
            const fetchIsSaved = async () => {
                const response = await spotifyAPI.checkIsItemSaved(item.type, [item.id])
                setIsSaved(response.data[0])
            }
            fetchIsSaved()
        }
    }, [item])
    return <div className={[footerStyles.footer__current, footerStyles.current].join(' ')}>
        {(playbackLoading === 'succeeded' && item) ?
            <>
                <Card image={item.album.images[0].url}
                      title={cutFrom30(item.name, 25)}
                      subtitle={item.album.artists.map(artist => artist.name).join(', ')}
                      explicit={item.explicit}
                      variant="small-"
                      link={`/track/${item?.id}`}
                      subtitleLink={`/artist/${item?.album.artists[0].id}`}
                />
            </>
            :
            <div className="card card--small-">
                <div className="card__image-container">
                    <Skeleton className="card__image"/>
                </div>
                <div className="card__details">
                    <Typography className="card__title"><Skeleton/></Typography>
                    <Typography className="card__subtitle"><Skeleton/></Typography>
                </div>
            </div>}
        <IconButton onClick={handleClick} variant="icon" fz={'1.2rem'}>
            {isSaved ? <IoIosCheckmarkCircle color={"var(--primary-500)"}/> : <IoIosAddCircleOutline/>}
        </IconButton>
    </div>
}


export default CurrentlyPlaying;