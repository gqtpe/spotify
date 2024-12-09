import type {SimplifiedAlbum} from "../../../../../api/types/album.ts";
import {FC, memo} from "react";
import Card from "../../../../../common/components/Cards/Card/Card.tsx";
import usePlayAction from "../../../../Player/hooks/usePlayAction.ts";
import Typography from "../../../../../common/components/Typography/Typography.tsx";

type Discography = {
    albums: SimplifiedAlbum[]
    title: string
}

const Discography: FC<Discography> = ({albums,title}) => {
    const play = usePlayAction()
    return (
        <>
            <Typography className="title" variant="h3">{title}</Typography>
            <div className="artist__albums">
                {albums.map(album => {
                    return <Card
                        key={album.id}
                        title={album.name}
                        subtitle={album.artists[0].name}
                        image={album.images[0]?.url}
                        onPlay={() => play({type: 'album', context_uri: album.uri})}
                        link={`/${album.type}/${album.id}`}
                    />
                })}
            </div>
        </>
    );
};

export default memo(Discography);