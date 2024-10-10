import {FC} from "react";
import {useAppSelector} from "../../../features/Application/hooks";
import styles from '../../../features/Browse/Browse.module.scss'
import type {ResponseType} from "../../../api/types/common.ts";
import {AppRootStateType} from "../../../features/Application/types.ts";
import Card from "./Card/Card.tsx";
import {SimplifiedAlbum} from "../../../api/types/album.ts";
import {Artist} from "../../../api/types/artist.ts";
import {SimplifiedPlaylist} from "../../../api/types/playlist.ts";


type CardsProps = {
    selector: (state: AppRootStateType) => ResponseType<SimplifiedPlaylist[] | Artist[] | SimplifiedAlbum[]> | undefined
    preview?: boolean
};
const Cards: FC<CardsProps> = ({selector, preview}) => {
    const item = useAppSelector(selector)
    const navigate = useNavigate()

    const detailsNavigate = (id: string, type: string) => {
        navigate(`${type}s/${id}`)
    }

    if (!item) {
        return <div>loading</div>
    }
    if (item.items.length === 0) {
        return <div>no result founded</div>
    }
    return (
        <div className={styles.container + ' ' + (preview && styles.preview)}>
            {item.items.map(item => {

                let subTitle = ''
                switch (item.type) {
                    case 'playlist':
                        subTitle = 'By ' + item.owner.display_name;
                        break;
                    case "album":
                        subTitle = item.release_date.slice(0, 4) + ' - ' + item.artists.map(artist => artist.name).join(', ')
                        break;
                    case "artist":
                        subTitle = 'Artist'
                        break;
                }
                return <Card
                    key={item.id}
                    cardID={item.id}
                    type={item.type}
                    title={item.name}
                    image={item.images[0] ? item.images[0].url : null}
                    round={item.type === 'artist'}
                    subtitle={subTitle}/>
            })}
        </div>
    );
};

export default Cards;