import {DetailsHTMLAttributes, FC, memo} from "react";
import styles from './Playlist.module.scss'
import type {Playlist as PlaylistType} from '../../../api/spotifyAPI'
import Typography from "../Typography/Typography.tsx";
import Button from "../Button/Button.tsx";
import {IoMdPlay} from "react-icons/io";

type PlaylistProps = DetailsHTMLAttributes<HTMLDivElement> & {
    playlist: PlaylistType
}

const Playlist: FC<PlaylistProps> = ({playlist, ...rest}) => {
    return <div className={styles.playlist} {...rest}>

        <div className={styles.image}>
            <img src={playlist.images[0].url} alt={playlist.name}/>
            <Button variant={"icon"} className={styles.popup}><IoMdPlay/></Button>
        </div>
        <div className={styles.details}>
            <Typography className={styles.title}>{playlist.name}</Typography>
            <Typography variant='caption' className={styles.subtitle}>By {playlist.owner.display_name}</Typography>
        </div>
    </div>
}

export default memo(Playlist)