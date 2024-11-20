import {useFetchGenrePlaylists} from "./useFetchGenrePlaylists.ts";
import Card from "../../../../common/components/Cards/Card/Card.tsx";
import browseStyles from "../../Browse.module.scss";
import styles from "./GenrePage.module.scss"
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {usePlayAction} from "../../../Player";

const GenrePage = () => {
    const {item} = useFetchGenrePlaylists()
    const play = usePlayAction()

    if (!item) {
        return <div>Loading...</div>
    }
    return <div className={styles.page}>
        <Typography variant="h3" className={styles.page__title}>{item.message}</Typography>
        <div className={browseStyles.container}>
            {
                item.playlists!.items!.map(playlist => {
                        const onPlay = () => play({type: 'playlist', context_uri: playlist.uri})
                        return <Card
                            key={playlist.id}
                            variant={'default'}
                            image={playlist.images[0] ? playlist.images[0].url : ''}
                            title={playlist.name} subtitle={'By ' + playlist.owner.display_name}
                            link={'/playlist/' + playlist.id}
                            onPlay={onPlay}
                        />
                    }
                )
            }
        </div>
    </div>
}


export default GenrePage;