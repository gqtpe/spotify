import {Outlet, useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {Tabs} from "./browseSlice.ts";
import {tabs} from "./tabs.ts";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {appHooks} from "../Application";
import {browseActions} from "./index.ts";


export const Browse = () => {
    const {useAppSelector, useActions} = appHooks
    const activeTab = useAppSelector(state => state.browse.activeTab)
    const {setActiveTab} = useActions(browseActions)
    const location = useLocation()

    const handleChange = useCallback((tab: Tabs) => {
        setActiveTab(tab)
    }, [setActiveTab])


    const tabItems = tabs.map((tab) => {
        if (tab === 'all') return <TabItem key={tab} value={tab} label={'All'}/>

        return <TabItem key={tab} value={tab} label={tab[0].toUpperCase() + tab.slice(1) + 's'}/>
    })


    useEffect(() => {
        //did mount
        const tab = location.pathname.split('/')[3] as Tabs
        if (!tab) {
            setActiveTab('all')
        } else {
            setActiveTab(tab)
        }
    }, [])

    return <div>
        <TabGroup value={activeTab} onChange={handleChange}>
            {tabItems}
        </TabGroup>
        <Outlet/>
    </div>
}