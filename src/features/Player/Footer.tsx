import {FC, useMemo} from "react";
import styles from "./Footer.module.scss";
import Card from "../../common/components/Cards/Card/Card.tsx";
import {useAppSelector} from "../Application/hooks";
import {Panel, Player, playerSelectors} from "./";


export const Footer: FC = () => {
    //--
    const item = useAppSelector(playerSelectors.selectPlaybackItem)
    //--

    const subTitle = useMemo(() => {
        if (item) return item.album.artists.map(artist => artist.name).join(', ')
    }, [item])


    return <footer className={styles.footer}>
        <div className={[styles.footer__current, styles.current].join(' ')}>
            {item ?
                <Card image={item.album.images[0]!.url}
                      subtitle={subTitle!}
                      title={item.name}
                      explicit={item.explicit}
                      variant="small"
                /> : 'no item'
            }
        </div>
        <Player/>
        <Panel/>
    </footer>
}