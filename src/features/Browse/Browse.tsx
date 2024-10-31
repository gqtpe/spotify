import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {Tabs} from "./browseSlice.ts";
import {tabs} from "./tabs.ts";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {browseActions} from "./index.ts";
import styles from './Browse.module.scss';
import {useActions, useAppSelector} from "../Application/hooks";

export const Browse = () => {
    const activeTab = useAppSelector(browseSelectors.selectActiveTab)
    const browseLoading = useAppSelector(browseSelectors.selectLoading)
    const query = useAppSelector(browseSelectors.selectQuery)
    const navigate = useNavigate()

    const handleChange = useCallback((tab: Tabs) => {
        setActiveTab(tab);
        if (tab === 'all') {
            navigate('')
        } else {
            navigate(tab)
        }
    }, [setActiveTab, navigate])

    const handleSearch = useCallback((query: string, tab: Tabs) => {
        browse({query, tab})
    }, [browse])
    useEffect(() => {
        if (query) {
            clearItems();
            handleSearch(query, activeTab)
        }
    }, [query])

    const tabItems = tabs.map((tab, index) => {
        if (tab === 'all') return <TabItem key={tab} value={tab} label={'All'}/>
        return <TabItem key={tab} value={tab} label={tab[0].toUpperCase() + tab.slice(1)} disabled={index>4}/>
    })

    return <div className={styles.browse}>
        <TabGroup value={activeTab} handleChange={handleChange} className={styles.tabs}>
            {tabItems}
        </TabGroup>
        <Outlet/>
    </div>
}