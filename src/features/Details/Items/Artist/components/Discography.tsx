import type {SimplifiedAlbum} from "../../../../../api/types/album.ts";
import {FC} from "react";
import Card from "../../../../../common/components/Cards/Card/Card.tsx";
import {useNavigate} from "react-router-dom";

type Discography = {
    albums: SimplifiedAlbum[]
}

const Discography: FC<Discography> = ({albums}) => {
    const navigate = useNavigate()
    return (
        <div className="artist__albums">
            {albums.map(album => {
                return <Card
                    key={album.id}
                    title={album.name}
                    subtitle={album.artists[0].name}
                    image={album.images[0]?.url}
                    link={`/album/${album.id}`}
                    navigate={navigate}
                />
            })}
        </div>
    );
};

export default Discography;