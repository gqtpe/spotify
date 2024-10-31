import {browseSelectors} from "../../"
import {memo} from "react";
import {browseActions, browseSelectors} from "../../"
import {memo, useCallback, useEffect} from "react";
import styles from '../../Browse.module.scss'
import {useActions, useAppSelector} from "../../../Application/hooks";
import Table from "../../../../common/components/Table/Table.tsx";
import useIntersectionObserver from "../../../Application/hooks/useIntersectionObserver.tsx";


const Tracks = () => {
    const tracks = useAppSelector(browseSelectors.selectTracks)
    const {
        fetchNewPortion,
        browse
    } = useActions(browseActions)
    const query = useAppSelector(browseSelectors.selectQuery)
    const activeTab = useAppSelector(browseSelectors.selectActiveTab)
    const getPortion = useCallback(() => {
        console.log('portion')
        fetchNewPortion()
    }, [fetchNewPortion])
    const {triggerRef} = useIntersectionObserver(getPortion, tracks?.items)
    useEffect(() => {
        if (!tracks) {
            if (query) {
                browse({query, tab: activeTab})
            }
        }
    }, [tracks]);

    return (
        <div className={styles.tracks}>
            <Table columns={trackColumns} data={tracks?.items ? tracks.items : []} />
            <div ref={triggerRef}>trigger</div>
        </div>
    );
};

export default memo(Tracks);
