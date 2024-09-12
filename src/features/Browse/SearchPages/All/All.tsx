import {FC, memo} from "react";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {browseSelectors, Tracks} from "../../";
import Cards from "../../../../common/components/Cards/Cards.tsx";
import styles from '../../Browse.module.scss'




const AllPage: FC = () =>{
    return <div className={styles.all}>
        <div className={styles.all__songs}>
            <Typography variant="h4" className={styles.title}>Songs</Typography>
            <Tracks/>
        </div>
        <div className={styles.all__playlists}>
            <Typography variant="h4" className={styles.title}>Playlists</Typography>
            <Cards selector={browseSelectors.selectPlaylists} preview={true}/>
        </div>
        <div className={styles.all__albums}>
            <Typography variant="h4" className={styles.title}>Albums</Typography>
            <Cards selector={browseSelectors.selectAlbums} preview={true}/>
        </div>
        <div className={styles.all__artists}>
            <Typography variant="h4" className={styles.title}>Artists</Typography>
            <Cards selector={browseSelectors.selectArtists} preview={true}/>
        </div>
    </div>
}

export default memo(AllPage)