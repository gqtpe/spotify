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
import {useParams} from "react-router-dom";
import {usePlayAction} from "../../../features/Player";
import getSubtitleForCard from "../../utils/getSubtitleForCard.ts";
import getSubtitleLink from "../../utils/getSubtitleLink.ts";


type CardsProps = {
    selector: (state: AppRootStateType) => ResponseType<SimplifiedPlaylist[] | Artist[] | SimplifiedAlbum[]> | undefined
    preview?: boolean
};
const Cards: FC<CardsProps> = ({selector, preview}) => {
        const item = useAppSelector(selector)
        const activeTab = useAppSelector(browseSelectors.selectActiveTab)
        const query = useParams().query
        const {fetchNewPortion, browse} = useActions(browseActions)
        const getPortion = useCallback(() => {
            fetchNewPortion()
        }, [fetchNewPortion])
        const play = usePlayAction()
        const {triggerRef} = useIntersectionObserver(getPortion, item?.items)
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
            if (!item) {
                return null
            }
            const subTitle = getSubtitleForCard({item})
            const subtitleLink = getSubtitleLink({item})
            const callback = () => {
                play({type: 'artist', context_uri: item.uri})
            }

            return <Card
                key={item.id}
                title={item.name}
                subtitle={subTitle}
                image={item.images[0]?.url || undefined}
                round={item.type === 'artist'}
                onPlay={callback}
                link={`/${item.type}/${item.id}`}
                titleLink={`/${item.type}/${item.id}`}
                subtitleLink={subtitleLink}
            />
        }) : null
        return (<>
                <div className={styles.container + ' ' + (preview && styles.preview)}>
                    {cardItems}
                </div>
                {!preview && item.items.length && <div className={styles.trigger} ref={triggerRef}>
                    <div className="loader"></div>
                </div>}
            </>
        );
    }
;

export default Cards;