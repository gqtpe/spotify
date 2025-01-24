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


const ProgressBar: FC<Props> = ({progress, duration,onSeekEnd, onSeek, loading, isPlaying}) => {
    const [value, setValue] = useState(progress)
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null)
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null)
    const onMouseUp = useCallback(() => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
            const timeOutID = setTimeout(() => {
               onSeek(value)
            }, 300)
        setDebounceTimeout(timeOutID)
    }, [loading,value,onSeek])
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
            setValue(e.currentTarget.valueAsNumber)
    },[])

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

    return <div className={[styles.progressBar, (loading ? styles.disabled: '')].join(' ')}>
        <label htmlFor="progress" className={styles.progressBar__progress}><Typography
            variant='caption'>{loading ? blankTime : timeHelpers.msToTime(value)}</Typography></label>
        <input
            name="progress"
            className={[styles.progressBar__range, styles.range,].join(' ')}
            type="range"
            min={0}
            step={1}
            max={duration}
            value={value}
            disabled={loading}
            onChange={handleChange}
            onMouseUp={onMouseUp}
        />
        <label htmlFor="progress" className={styles.progressBar__duration}><Typography
            variant='caption'>{loading ? blankTime : timeHelpers.msToTime(duration)}</Typography></label>
    </div>
}
export default memo(ProgressBar)