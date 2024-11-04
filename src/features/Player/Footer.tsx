import {FC, useMemo} from "react";
import styles from "./Footer.module.scss";
import Card from "../../common/components/Cards/Card/Card.tsx";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {FaPause, FaPlay, FaShuffle} from "react-icons/fa6";
import {FaStepBackward, FaStepForward} from "react-icons/fa";
import usePanelActions from "./hooks/usePanelActions.ts";
import {useAppSelector} from "../Application/hooks";
import {playerSelectors} from "./index.ts";
import Repeat from "./components/Repeat/Repeat.tsx";

export const Footer: FC = () => {
    //todo:
    // 3.1: add player slice
    // 3.?: realize player with rtk
    // 3.2: auto update when track is changing outside?
    //TODO: need to bind with WEB PLAYBACK SDK


    const device = useAppSelector(playerSelectors.selectActiveDevice)
    const shuffleState = useAppSelector(playerSelectors.selectShuffleState)
    const is_playing = useAppSelector(playerSelectors.selectIsPlaying)
    const item = useAppSelector(playerSelectors.selectPlaybackItem)
    const repeatState = useAppSelector(playerSelectors.selectRepeatState)

    const {togglePlay, shuffle, next, prev, repeat} = usePanelActions(device, shuffleState, is_playing, repeatState)
    const subTitle = useMemo(() => {
        if (item) return item.album.artists.map(artist => artist.name).join(', ')
    }, [item])
    if (!device) {
        console.log('No playback')
        return <footer className={styles.footer}>
            <div className={styles.footer__actions}>
                no device available
            </div>
        </footer>
    }


    return <footer className={styles.footer}>
        <div className={[styles.footer__current, styles.current].join(' ')}>
            {item ?
                <Card image={item.album.images[0]!.url}
                      subtitle={subTitle!}
                      title={item.name}
                      explicit={item.explicit}
                      variant="small"
                /> : 'no item'
            }
        </div>
        <div className={[styles.footer__panel, styles.panel].join(' ')}>
            <div className={styles.panel__actions}>
                <IconButton variant="icon" className={styles.shuffle} onClick={shuffle}>
                    {shuffleState ? <FaShuffle className={styles.active}/> : <FaShuffle/>}
                </IconButton>
                <IconButton variant="icon" onClick={prev}>
                    <FaStepBackward/>
                </IconButton>
                <IconButton variant="outlined" className={styles.play} onClick={togglePlay}>
                    {is_playing ? <FaPause/> : <FaPlay/>}
                </IconButton>
                <IconButton variant="icon" onClick={next}>
                    <FaStepForward/>
                </IconButton>
                <Repeat variant={repeatState} onClick={repeat}/>
            </div>
            <div className={styles.panel__slider}>
                <input type="range"/>
            </div>
        </div>
        <div className={styles.panel__actions}>
            deviceID:{device.id}<br/>
            deviceName:{device.name}<br/>
        </div>
    </footer>
}