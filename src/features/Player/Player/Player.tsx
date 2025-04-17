import {FC, memo} from "react";
import styles from "../Footer.module.scss";
import {Actions, ProgressBar} from "../index.ts";
import {useProgressBar} from "@/features/Application/hooks";


const Player: FC = () => {
    const {onSeek, onSeekEnd, progress, duration} = useProgressBar()
    return <div className={[styles.footer__player, styles.player].join(' ')}>
        <Actions/>
        <ProgressBar
            onSeek={onSeek}
            onSeekEnd={onSeekEnd}
            progress={progress}
            duration={duration}
        />
    </div>
}
export default memo(Player);