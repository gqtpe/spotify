import {FC} from "react";
import {useAppSelector} from "../../../features/Application/hooks";
import styles from '../../../features/Browse/Browse.module.scss'
import type {Artist, Playlist, ResponseType, SimplifiedAlbum} from "../../../api/spotifyAPI.ts";
import {AppRootStateType} from "../../../features/Application/types.ts";
import Card from "./Card/Card.tsx";

type CardsProps = {
    selector: (state: AppRootStateType) => ResponseType<Playlist[] | Artist[] | SimplifiedAlbum[]> | undefined
    preview?: boolean
};
const Cards: FC<CardsProps> = ({selector, preview}) => {
    const item = useAppSelector(selector)
    //todo: process a case when the element does not have an image(throws error)
    let resultElements;
    if (!item) {
        return <div>loading</div>
    }
    debugger;
    if(item){
        resultElements = item.items.map(item => {
            console.log(item)
            let subTitle = ''
            switch (item.type) {
                case 'playlist':
                    subTitle = 'By ' + item.owner.display_name;
                    break;
                case "album":
                    subTitle = item.release_date.slice(0, 4) + ' - ' + item.artists.map(artist => artist.name).join(', ')
                    break;
                case "artist":
                    subTitle = 'artist'
                    break;
            }
            return <Card key={item.id} title={item.name} image={item.images[0].url} round={item.type === 'artist'}
                         subtitle={subTitle}/>
        })
    }else{
        resultElements = 'No results'
    }
    return (
        <div className={styles.container + ' ' + (preview && styles.preview)}>
            {resultElements}
        </div>
    );
};

export default Cards;