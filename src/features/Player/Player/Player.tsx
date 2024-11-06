import {FC} from "react";
import styles from "../Footer.module.scss";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import {FaPause, FaPlay, FaShuffle} from "react-icons/fa6";
import {FaStepBackward, FaStepForward} from "react-icons/fa";
import {playerSelectors, ProgressBar, Repeat, usePlayerActions, useProgress} from "../index.ts";
import {useAppSelector} from "../../Application/hooks";


export const blankTime = "-:--" as const

const Player: FC = () => {
    const device = useAppSelector(playerSelectors.selectActiveDevice)
    const shuffleState = useAppSelector(playerSelectors.selectShuffleState)
    const is_playing = useAppSelector(playerSelectors.selectIsPlaying)
    const item = useAppSelector(playerSelectors.selectPlaybackItem)
    const repeatState = useAppSelector(playerSelectors.selectRepeatState)
    const {togglePlay, shuffle, next, prev, repeat} = usePlayerActions(device, shuffleState, is_playing, repeatState)
    const {progress, seekPosition} = useProgress(device)


    return <div className={[styles.footer__player, styles.player].join(' ')}>
        <div className={styles.player__actions}>
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
        <ProgressBar progress={progress ? progress:blankTime} duration={item?.duration_ms? item.duration_ms: blankTime} onSeek={seekPosition}/>
    </div>
}
export default Player;