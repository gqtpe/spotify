import {FC, useEffect} from "react";
import styles from "./Footer.module.scss";
import {CurrentlyPlaying, Panel, Player, playerActions} from "./";
import {useActions} from "../Application/hooks";


export const Footer: FC = () => {
    const {fetchPlaybackState} = useActions(playerActions)
    useEffect(() => {
       fetchPlaybackState()
    }, [])
    return <footer className={styles.footer}>
        <CurrentlyPlaying/>
        <Player/>
        <Panel/>
    </footer>
}