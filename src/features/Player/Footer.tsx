import {FC} from "react";
import styles from "./Footer.module.scss";
import {useAppSelector} from "../Application/hooks";
import Card from "../../common/components/Cards/Card/Card.tsx";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {FaPause, FaPlay, FaRepeat, FaShuffle} from "react-icons/fa6";
import {FaStepBackward, FaStepForward} from "react-icons/fa";
import usePanelActions from "./hooks/usePanelActions.ts";
import {playerSelectors} from "./index.ts";

export const Footer: FC = () => {
    const is_playing = useAppSelector(playerSelectors.selectIsPlaying)
    const {togglePlay} = usePanelActions(is_playing)
    //todo:
    // 3.1: add player slice
    // 3.?: realize player with rtk
    // 3.2: auto update when track is changing outside?


    //TODO: need to bind with WEB PLAYBACK SDK
    const playback = useAppSelector(playerSelectors.selectPlayback)
    if(!playback.device) {
        console.log('No playback')
        return <footer className={styles.footer}>
            <div className={styles.footer__actions}>
                no device available
            </div>
        </footer>
    }

    let subTitle = 'null';
    if (playback.item.type === 'track') {
        subTitle = playback.item.album.artists.map(artist => artist.name).join(', ')
    }
    return <footer className={styles.footer}>
        <div className={[styles.footer__current, styles.current].join(' ')}>
            <Card image={playback.item.type === 'track' ? playback.item.album.images[0]!.url : null}
                  subtitle={subTitle}
                  title={playback.item.name}
                  explicit={playback.item.explicit}
                  variant="small"
            />
        </div>
        <div className={[styles.footer__panel, styles.panel].join(' ')}>
            <div className={styles.panel__actions}>
                <IconButton variant="icon">
                    <FaShuffle/>
                </IconButton>
                <IconButton variant="icon">
                    <FaStepBackward/>
                </IconButton>
                <IconButton variant="outlined" className={styles.play} onClick={togglePlay}>
                    {is_playing ? <FaPause/> : <FaPlay/>}
                </IconButton>
                <IconButton variant="icon">
                    <FaStepForward/>
                </IconButton>
                <IconButton variant="icon">
                    <FaRepeat/>
                </IconButton>
            </div>
            <div className={styles.panel__slider}>
                <input type="range"/>
            </div>
        </div>
        <div className={styles.panel__actions}>
            deviceID:{playback.device.id}<br/>
            deviceName:{playback.device.name}<br/>
        </div>
    </footer>
}