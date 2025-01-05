import {FC, useMemo} from "react";
import footerStyles from "./Footer.module.scss";
import Card from "../../common/components/Cards/Card/Card.tsx";
import "../../common/components/Cards/Card/Card.scss";
import {useAppSelector} from "../Application/hooks";
import {playerSelectors} from "./index.ts";
import Skeleton from "../../common/components/Skeleton/Skeleton.tsx";
import Typography from "../../common/components/Typography/Typography.tsx";


const CurrentlyPlaying: FC = () => {

    const item = useAppSelector(playerSelectors.selectPlaybackItem)
    const playbackLoading = useAppSelector(playerSelectors.selectPlaybackLoading)
    const subTitle = useMemo(() => {
        if (item) return item.album.artists.map(artist => artist.name).join(', ')
    }, [item])
    return <div className={[footerStyles.footer__current, footerStyles.current].join(' ')}>
        {playbackLoading === 'succeeded' ?
            <Card image={item ? item.album.images[0].url : 'blank'}
                  subtitle={subTitle ? subTitle : 'blank'}
                  title={item ? item.name : 'blank'}
                  explicit={item ? item.explicit : false}
                  variant="small-"
                  link={`/track/${item?.id}`}
                  subtitleLink={`/artist/${item?.album.artists[0].id}`}
            />
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

    </div>
}


export default CurrentlyPlaying;