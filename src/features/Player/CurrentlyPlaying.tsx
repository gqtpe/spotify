import {FC, useMemo} from "react";
import footerStyles from "./Footer.module.scss";
import Card from "../../common/components/Cards/Card/Card.tsx";
import styles from "../../common/components/Cards/Card/Card.module.scss";
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
        {playbackLoading === 'succeeded' ? <Card image={item ? item.album.images[0].url : 'blank'}
                      subtitle={subTitle ? subTitle : 'blank'}
                      title={item ? item.name : 'blank'}
                      explicit={item ? item.explicit : false}
                      variant="small"
        /> : <div className={[styles.card, styles.small].join(' ')}>
            <div className={styles.card__image_wp}>
                <Skeleton className={styles.image}/>
            </div>
            <div className={styles.card__details}>
                <Typography className={styles.title}><Skeleton/></Typography>
                <Typography className={styles.subtitle}><Skeleton/></Typography>
            </div>
        </div>}

    </div>
}


export default CurrentlyPlaying;