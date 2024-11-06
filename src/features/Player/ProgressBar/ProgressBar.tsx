import {ChangeEvent, FC, memo, useState} from "react";
import styles from './ProgressBar.module.scss';
import Typography from "../../../common/components/Typography/Typography.tsx";
import {timeHelpers} from "../";
import {blankTime} from "../Player/Player.tsx";

type blankTime = typeof blankTime
type Props = {
    progress: number | blankTime
    duration: number | blankTime
    onSeek: (position_ms: number) => void
}


const ProgressBar: FC<Props> = ({progress, duration, onSeek}) => {
    const [value, setValue] = useState(progress)
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        setValue(e.target.valueAsNumber)
        const curr = setTimeout(() => {
            onSeek(e.target.valueAsNumber)
        }, 300)
        setTimeoutID(curr)
    }
    let resultProgress;
    let resultDuration;
    const isBlankTime = value === blankTime ? 0 : value;
    if (progress === blankTime || duration === blankTime) {
        resultProgress = blankTime
        resultDuration = blankTime
    } else {
        const progressTime = timeHelpers.msToTime(isBlankTime)
        const durationTime = timeHelpers.msToTime(duration)
        resultProgress = `${progressTime.min}:${timeHelpers.formatWithLeadingZero(progressTime.sec)}`
        resultDuration = `${durationTime.min}:${timeHelpers.formatWithLeadingZero(durationTime.sec)}`
    }

    return <div className={styles.progressBar}>
        <label htmlFor="progress" className={[styles.progressBar__progress, styles.progress].join(' ')}><Typography
            variant='caption'>{resultProgress}</Typography></label>
        <input
            name="progress"
            className={[styles.progressBar__range, styles.range].join(' ')}
            type="range"
            min={0}
            step={1}
            max={duration}
            value={isBlankTime}
            onChange={handleChange}
        />
        <label htmlFor="progress" className={[styles.progressBar__duration, styles.duration].join(' ')}><Typography
            variant='caption'>{resultDuration}</Typography></label>
    </div>
}
export default memo(ProgressBar)