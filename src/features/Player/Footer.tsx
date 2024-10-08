import {FC} from "react";
import styles from "./Footer.module.scss";
import {useAppSelector} from "../Application/hooks";
import {AppRootStateType} from "../Application/types.ts";
import Card from "../../common/components/Cards/Card/Card.tsx";


const selectPlayerItem = (state: AppRootStateType) => state.player.item
export const Footer: FC = () => {
    //todo:
    // 3.1: add player slice
    // 3.?: realize player with rtk
    // 3.2: auto update when track is changing outside?
    const item = useAppSelector(selectPlayerItem)
    if (item) {
        if (item.type === 'track') {
            const subTitle = item.album.artists.map(artist => artist.name).join(', ')
            return <footer className={styles.footer}>
                <Card image={item.album.images[0]!.url}
                      subtitle={subTitle}
                      title={item.name}
                      explicit={item.explicit}
                      variant="small"
                />
            </footer>
        }

    }

    return
}