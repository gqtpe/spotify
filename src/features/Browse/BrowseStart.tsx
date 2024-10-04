import Typography from "../../common/components/Typography/Typography.tsx";
import styles from "./Browse.module.scss"

export const BrowseStart = () =>{
    return <div className={styles.startPage}>
        <Typography variant="h4" sx={{marginTop:32}}>Browse all</Typography>
    </div>
}
