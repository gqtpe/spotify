import {FC} from "react";
import styles from "./Footer.module.scss";
import {useAppSelector} from "../Application/hooks";
import {AppRootStateType} from "../Application/types.ts";
import Card from "../../common/components/Cards/Card/Card.tsx";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {FaPause, FaRepeat, FaShuffle} from "react-icons/fa6";
import {FaStepBackward, FaStepForward} from "react-icons/fa";
import usePanelActions from "./hooks/usePanelActions.ts";


const selectPlayerItem = (state: AppRootStateType) => state.player.item
export const Footer: FC = () => {

    const {togglePlay, prev, next, repeat, shuffle} = usePanelActions()
    //todo:
    // 3.1: add player slice
    // 3.?: realize player with rtk
    // 3.2: auto update when track is changing outside?
    const item = useAppSelector(selectPlayerItem)
    if (!item) {
        return
    }
    let subTitle = 'null';
    if (item.type === 'track') {
        subTitle = item.album.artists.map(artist => artist.name).join(', ')
    }
    return <footer className={styles.footer}>
        <div className={[styles.footer__current, styles.current].join(' ')}>
            <Card image={item.type === 'track' ? item.album.images[0]!.url : null}
                  subtitle={subTitle}
                  title={item.name}
                  explicit={item.explicit}
                  variant="small"
            />
        </div>
        <div className={[styles.footer__panel, styles.panel].join(' ')}>
            <div className={styles.panel__actions}>
                <IconButton variant="icon">
                    <FaShuffle/>
                </IconButton>
                <IconButton variant="icon">
                    <FaStepBackward/>
                </IconButton>
                <IconButton variant="outlined" className={styles.play}>
                    <FaPause/>
                </IconButton>
                <IconButton variant="icon">
                    <FaStepForward/>
                </IconButton>
                <IconButton variant="icon">
                    <FaRepeat/>
                </IconButton>
            </div>
            <div className={styles.panel__slider}>
                <input type="range"/>
            </div>
        </div>
    </footer>
}