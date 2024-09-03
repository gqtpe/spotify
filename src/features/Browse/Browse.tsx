import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {appHooks} from "../Application";
import {useActions} from "../Application/hooks";
import {browseActions} from "./index.ts";
import {Outlet, useLocation} from "react-router-dom";
import {tabs} from "./tabs.ts";
import {useEffect} from "react";
import {Tabs} from "./browseSlice.ts";


export const Browse = () => {
    const activeTab = appHooks.useAppSelector(state => state.browse.activeTab)
    const {setActiveTab} = useActions(browseActions)
    const location = useLocation()
    const tabItems = tabs.map((tab) => {
            if(tab === 'all') return <TabItem key={tab} value={tab} label={'All'}/>
            tab = tab + 's'
            return <TabItem key={tab} value={tab} label={tab[0].toUpperCase() + tab.slice(1)}/>
        })
    useEffect(()=>{
        const tab = location.pathname.split('/')[2] as Tabs
        if(!tab){
            setActiveTab('all')
        }else{
            setActiveTab(tab)
        }

    },[location.pathname, setActiveTab])
    return <div>
        <TabGroup value={activeTab} onChange={(e) => setActiveTab(e)}>
            {tabItems}
        </TabGroup>
        <Outlet/>
    </div>
}



