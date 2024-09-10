import {useAppSelector} from "../../../Application/hooks";
import Playlist from "../../../../common/components/Playlist/Playlist.tsx";
import styles from '../../Browse.module.scss'

const Playlists = () => {
    const playlists = useAppSelector(state => state.browse.items.playlists)

    if(!playlists?.items){
        return <div>loading</div>
    }
    const mapElements = playlists.items.map(playlist=>{
        return <Playlist playlist={playlist}/>
    })
    return (
        <div className={styles.playlists}>
            {mapElements}
        </div>
    );
};

export default Playlists;