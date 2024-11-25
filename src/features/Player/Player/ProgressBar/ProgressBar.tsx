import {ChangeEvent, FC, memo, useCallback, useEffect, useState} from "react";
import styles from './ProgressBar.module.scss';
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {timeHelpers} from "../../index.ts";

export const blankTime = "-:--" as const

type blankTime = typeof blankTime
type Props = {
    progress: number
    duration: number
    onSeek: (position_ms: number) => void
    onSeekEnd?: () => void
    loading?: boolean
    isPlaying: boolean
}


const ProgressBar: FC<Props> = ({progress, duration, onSeek, loading, onSeekEnd, isPlaying}) => {
    const [value, setValue] = useState(progress)
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null)
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null)
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!loading) {
            setValue(e.target.valueAsNumber)
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
            const timeOutID = setTimeout(() => {
                onSeek(e.target.valueAsNumber)
            }, 300)
            setDebounceTimeout(timeOutID)
        }
    }, [onSeek, loading])

    useEffect(() => {
        if (!loading) {
            if (isPlaying) {
                if (!intervalID) {
                    const curr = setInterval(() => {
                        if(value+1000<duration){
                            setValue(value => value + 1000)
                        }
                    }, 1000)
                    setIntervalID(curr)
                }
            } else {
                if (intervalID) {
                    clearInterval(intervalID)
                    setIntervalID(null)
                }
            }
        }
    }, [duration, progress, isPlaying])

    useEffect(()=>{
        if(!loading){
            if(isPlaying){
                if(value+1000>duration){
                    onSeekEnd?.()
                }
            }
        }
    },[value])
    useEffect(()=>{
        if(!loading){
            setValue(progress)
        }
    },[progress])

    return <div className={styles.progressBar}>
        <label htmlFor="progress" className={styles.progressBar__progress}><Typography
            variant='caption'>{loading ? blankTime : timeHelpers.msToTime(value)}</Typography></label>
        <input
            name="progress"
            className={[styles.progressBar__range, styles.range].join(' ')}
            type="range"
            min={0}
            step={1}
            max={duration}
            value={value}
            onChange={handleChange}
        />
        <label htmlFor="progress" className={styles.progressBar__duration}><Typography
            variant='caption'>{loading ? blankTime : timeHelpers.msToTime(duration)}</Typography></label>
    </div>
}
export default memo(ProgressBar)