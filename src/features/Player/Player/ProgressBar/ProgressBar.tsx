import {ChangeEvent, FC, memo, useCallback, useEffect, useRef, useState} from "react";
import styles from './ProgressBar.module.scss';
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {timeHelpers} from "../../index.ts";

export const blankTime = "-:--" as const

type blankTime = typeof blankTime
type Props = {
    progress: number | null
    duration: number | null
    onSeek: (position_ms: number) => void
    onSeekEnd?: () => void
}


const ProgressBar: FC<Props> = ({progress, duration, onSeek,onSeekEnd}) => {
    //moved debounce to ref for prevent rerenders
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const interval = useRef<NodeJS.Timeout | null>(null)
    const [value, setValue] = useState(progress)
    const handleSeek = useCallback(() => {
        if (null === value || null === duration) return;
        onSeek(value)
    }, [value, duration,onSeek,])
    //sending request for seek position only onMouseup

    // console.log(`value:${value}`)
    // console.log(`progress:${progress}`)
    // console.log(`duration:${duration}`)

    const onMouseUp = useCallback(() => {
        if (!value || !duration) {
            return
        }
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        const timeOutID = setTimeout(() => {
            handleSeek()
        }, 300)
        debounceTimeout.current = (timeOutID)
    }, [handleSeek])
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.valueAsNumber)
    }, [])


    const startInterval = useCallback(() => {
        if(!progress)return;
        //works only if progress exists
        if (interval.current) clearInterval(interval.current);
        interval.current = setInterval(() => {
            setValue((prev) => (prev !== null ? prev + 1000 : progress + 1000));
        }, 1000);
    },[progress])
    useEffect(()=>{
        if(!progress)return
        //for init value reset from null to loaded progress value,
        //to set new progress value after new track come
        if (value !== progress) {
            setValue(progress);
            startInterval();
        }
    },[progress])
    useEffect(()=>{
        if(!onSeekEnd || !value || !duration)return
        if(value >= duration){
            onSeekEnd()
        }
    },[value])
    useEffect(() => {
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, []);
    return <div className={[styles.progressBar, ((!progress) ? styles.disabled : '')].join(' ')}>
        <label htmlFor="progress" className={styles.progressBar__progress}><Typography
            variant='caption'>{value ? timeHelpers.msToTime(value) : blankTime}</Typography></label>
        <input
            name="progress"
            className={[styles.progressBar__range, styles.range,].join(' ')}
            type="range"
            min={0}
            step={1}
            max={duration || 0}
            value={value || 0}
            disabled={!duration || !value}
            onChange={handleChange}
            onMouseUp={onMouseUp}
        />
        <label htmlFor="progress" className={styles.progressBar__duration}><Typography
            variant='caption'>{duration ? timeHelpers.msToTime(duration) : blankTime}</Typography></label>
    </div>
}
export default memo(ProgressBar)