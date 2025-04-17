import {browseActions, browseSelectors} from "../../"
import {memo, useCallback, useEffect} from "react";
import styles from '../../Browse.module.scss'
import {useActions, useAppSelector} from "@/features/Application/hooks";
import Table from "@common/components/Table/Table.tsx";
import useIntersectionObserver from "@/features/Application/hooks/useIntersectionObserver.tsx";
import {trackColumns} from "./trackColumns.tsx";

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
            <Table enableRowNumbering data={tracks?.items ? tracks.items : []} columns={trackColumns}/>
            <div ref={triggerRef} className={styles.trigger}><div className="loader"></div></div>
        </div>
    );
};
export default memo(Tracks)