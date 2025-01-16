import {useActions, useAppSelector} from "../../../hooks";
import {CurrentlyPlaying, playerActions, playerSelectors} from "../../../../Player";
import Card from "../../../../../common/components/Cards/Card/Card.tsx";
import {useEffect} from "react";
import {cutFrom30} from "../../../../Browse/utils/cutFrom30.ts";
import "./Queue.scss";
import Typography from "../../../../../common/components/Typography/Typography.tsx";

const Queue = () => {
    const {fetchQueue} = useActions(playerActions)
    const queue = useAppSelector(playerSelectors.selectQueue)
    useEffect(() => {
        fetchQueue()
    }, [])
    return <div className="queue">
        <Typography variant="h6" className="current__subtitle">Now Playing</Typography>
        <CurrentlyPlaying/>
        <Typography variant="h6" className="current__subtitle">Queue</Typography>
        <div className="queue__list">
            {queue.map((t => {
                const subtitle = t.album.artists.map(t => t.name).join(', ')
                return <><Card
                    key={t.id}
                    title={cutFrom30(t.name)}
                    subtitle={subtitle}
                    image={t.album.images[1].url}
                    explicit={t.explicit}
                    variant="small-"
                    link={`/track/${t.id}`}
                    subtitleLink={`/artist/${t.album.artists[0].id}`}
                />
                </>
            }))}
        </div>
    </div>
}

export default Queue;