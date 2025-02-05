import Typography from "../../../../common/components/Typography/Typography.tsx";
import styles from "./BrowseStart.module.scss"
import Genres from "../../Genres/Genres.tsx";

export const BrowseStart = () => {
    return <div className={styles.browseStart}>
        <div className={styles.browseStart__header}>
            <Typography variant="h4" sx={{fontWeight: 'bolder'}}>Browse all</Typography>
        </div>
        <div className={styles.browseStart__tiles}>
            <Genres/>
        </div>
    </div>
}
