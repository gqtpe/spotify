import styles from "../../Browse.module.scss";
import {useAppSelector} from "../../../Application/hooks";
import {browseSelectors} from "../../index.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {trackColumns} from "../Tracks/trackColumns.tsx";
import Table from "../../../../common/components/Table/Table.tsx";
import Card from "../../../../common/components/Cards/Card/Card.tsx";


export const Songs = () => {

    const tracks = useAppSelector(browseSelectors.selectTracks)
    if (!tracks) {
        return <div>...</div>
    }
    const topResult = tracks.items[0]

    return (
        <div className={styles.all__songs}>
            <div>
                <Typography variant="h4" className={styles.title}>Top result</Typography>
                <Card
                    image={topResult?.album?.images[0].url}
                    title={topResult?.name}
                    subtitle={topResult?.artists[0].name}
                    explicit={topResult?.explicit}
                />
            </div>
            <div className={styles.songs}>
                <Typography variant="h4" className={styles.title}>Songs</Typography>
                <Table columns={trackColumns} data={tracks?.items ? tracks.items : []} enableStickyHeader={false}/>
            </div>
        </div>

    )
}