import {FC, memo, useMemo} from "react";
import styles from './ProgressBar.module.scss';
import Typography from "../../../common/components/Typography/Typography.tsx";

type Props = {
    progress: number
    duration: number
    onSeek: (progress: number) => void
}
const msToTime = (ms: number)=>{
    let secondsPlayed = 0;
    let minutesPlayed = 0;
    secondsPlayed = Math.floor(ms/1000);
    minutesPlayed = Math.floor(secondsPlayed/60);
    secondsPlayed = secondsPlayed % 60;
    return {sec: secondsPlayed, min:minutesPlayed}
}
const ProgressBar: FC<Props> = ({progress, duration, onSeek}) => {
    const progressTime = useMemo(()=>msToTime(progress), [progress]);
    const durationTime = useMemo(()=>msToTime(duration), [duration]);

    return <div className={styles.progressBar}>
        <label htmlFor="progress" className={styles.progressBar__progress}><Typography>{progressTime.min}:{progressTime.sec}</Typography></label>
        <input
            name="progress"
            className={styles.progressBar__range}
            type="range"
            min={0}
            max={Math.floor(duration / 1000)}
            value={Math.floor(progress / 1000)}
            onChange={e => onSeek(Number(e.target.value))}
        />
        <label htmlFor="progress" className={styles.progressBar__duration}><Typography>{durationTime.min}:{durationTime.sec}</Typography></label>
    </div>
}
export default memo(ProgressBar)