import Typography from "../../../../common/components/Typography/Typography.tsx";
import styles from "./BrowseStart.module.scss"
import {useBrowseCategories} from "./hooks/useBrowseCategories.ts";
import {BrowseTile} from "./BrowseTile/BrowseTile.tsx";

export const BrowseStart = () => {
    const {categories} = useBrowseCategories()
    return <div className={styles.browseStart}>
        <div className={styles.browseStart__header}>
            <Typography variant="h4" sx={{marginTop: 32}}>Browse all</Typography>
        </div>
        <div className={styles.browseStart__tiles}>
            {categories?.map(category => {
                return <BrowseTile key={category.id} item={category}/>
            })}
        </div>
    </div>
}
