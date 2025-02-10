import {FC} from "react";
import styles from "../Footer.module.scss";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import {FaPause, FaPlay, FaShuffle} from "react-icons/fa6";
import {FaStepBackward, FaStepForward} from "react-icons/fa";
import {playerSelectors, Repeat, usePlayerActions} from "../index.ts";
import {useAppSelector} from "../../Application/hooks";

const Actions: FC = () => {
    const activeDevice = useAppSelector(playerSelectors.selectActiveDevice)
    const shuffleState = useAppSelector(playerSelectors.selectShuffleState)
    const repeatState = useAppSelector(playerSelectors.selectRepeatState)
    const is_playing = useAppSelector(playerSelectors.selectIsPlaying)
    const {shuffle, repeat, next, prev, togglePlay} = usePlayerActions(activeDevice!,shuffleState, is_playing, repeatState)

    return <div className={styles.player__actions}>
        <IconButton variant="icon"
                    className={styles.shuffle}
                    onClick={shuffle}
                    disabled={!activeDevice}
        >
            {shuffleState ? <FaShuffle className={styles.active}/> : <FaShuffle/>}
        </IconButton>
        <IconButton variant="icon" onClick={prev} disabled={!activeDevice}>
            <FaStepBackward/>
        </IconButton>
        <IconButton variant="outlined" className={styles.play} onClick={togglePlay} disabled={!activeDevice}>
            {is_playing ? <FaPause/> : <FaPlay/>}
        </IconButton>
        <IconButton variant="icon" onClick={next} disabled={!activeDevice}>
            <FaStepForward/>
        </IconButton>
        <Repeat variant={repeatState} onClick={repeat} disabled={!activeDevice}/>
    </div>
}

export default Actions;