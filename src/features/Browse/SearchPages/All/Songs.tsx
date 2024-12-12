import styles from "./All.module.scss"
import {useAppSelector} from "../../../Application/hooks";
import {browseSelectors} from "../../index.ts";
import Card from "../../../../common/components/Cards/Card/Card.tsx";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {usePlayAction} from "../../../Player";


export const Songs = () => {
    const tracks = useAppSelector(browseSelectors.selectTracks)
    const play = usePlayAction()
    if (!tracks) {
        return <div>...</div>
    }
    const topResult = tracks.items[0]

    return (
        <div className={[styles.all__songs, styles.songs].join(' ')}>
            <div className={styles.songs__best}>
                <Typography variant="h4" className={styles.title}>Top result</Typography>
                <Card
                    image={topResult?.album?.images[0].url}
                    title={topResult?.name}
                    subtitle={topResult?.artists[0].name}
                    explicit={topResult?.explicit}
                    onPlay={() => play({type: 'track', uris: [topResult.uri], position:0})}
                    link={`/track/${topResult?.id}`}
                    subtitleLink={`/artist/${topResult?.artists[0].id}`}
                    variant="large"
                />
            </div>
            <div className={styles.songs__items}>
                <Typography variant="h4" className={styles.title}>Songs</Typography>
                {tracks.items.map((t, i) => {
                    function callback(){
                        play({type: 'track', uris: [t.uri]})
                    }
                    if (i > 3) return;
                    return <Card
                        key={t.id}
                        image={t.album.images[0].url}
                        title={t.name}
                        subtitle={t.artists[0].name}
                        explicit={t.explicit}
                        link={`/track/${t.id}`}
                        onPlay={callback}
                        subtitleLink={`/artist/${t.artists[0].id}`}
                        variant="small"
                    />
                })}
            </div>
        </div>

    )
}