import {FC, useCallback, useEffect} from "react";
import {useActions, useAppSelector} from "../../../features/Application/hooks";
import styles from '../../../features/Browse/Browse.module.scss'
import type {ResponseType} from "../../../api/types/common.ts";
import {AppRootStateType} from "../../../features/Application/types.ts";
import Card from "./Card/Card.tsx";
import {SimplifiedAlbum} from "../../../api/types/album.ts";
import {Artist} from "../../../api/types/artist.ts";
import {SimplifiedPlaylist} from "../../../api/types/playlist.ts";
import useIntersectionObserver from "../../../features/Application/hooks/useIntersectionObserver.tsx";
import {browseActions, browseSelectors} from "../../../features/Browse";
import {useNavigate, useParams} from "react-router-dom";
import {usePlayAction} from "../../../features/Player";


type CardsProps = {
    selector: (state: AppRootStateType) => ResponseType<SimplifiedPlaylist[] | Artist[] | SimplifiedAlbum[]> | undefined
    preview?: boolean
};
const Cards: FC<CardsProps> = ({selector, preview}) => {
        const item = useAppSelector(selector)
        const activeTab = useAppSelector(browseSelectors.selectActiveTab)
        const query = useParams().query
        const navigate = useNavigate()
        const {fetchNewPortion, browse} = useActions(browseActions)
        const getPortion = useCallback(() => {
            fetchNewPortion()
        }, [fetchNewPortion])
        const play = usePlayAction()
        const {triggerRef} = useIntersectionObserver(getPortion, item?.items)
        const onClick = useCallback((link: string) => {
            navigate(link)
        }, [])
        useEffect(() => {
            if (!item) {
                if (query) {
                    browse({query, tab: activeTab})
                }
            }
        }, [item]);
        if (!item) {
            return null
        }

        const cardItems = item.items ? item.items.map(item => {
            let subTitle = ''
            if (!item) {
                return null
            }
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
            const callback = () => {
                if (item.type === 'artist') {
                    play({type: 'artist', context_uri: item.uri})
                } else {
                    play({type: item.type, context_uri: item.uri})
                }
            }
            return <Card
                key={item.id}
                title={item.name}
                subtitle={subTitle}
                image={item.images[0]?.url || undefined}
                round={item.type === 'artist'}
                onPlay={callback}
                link={`/${item.type}/${item.id}`}
                navigate={onClick}
            />
        }) : null
        return (<>
            <div className={styles.container + ' ' + (preview && styles.preview)}>
                {cardItems}
            </div>
                {item.items.length && <div className={styles.trigger} ref={triggerRef}>trigger</div>}
            </>
        );
    }
;

export default Cards;