import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {useState} from "react";


export const Browse = () =>{
    const [activeTab, setActiveTab] = useState('all');
    return <div>
        <TabGroup value={activeTab} onChange={setActiveTab}>
            <TabItem value="all" label="All"/>
            <TabItem value="songs" label="Songs"/>
            <TabItem value="playlists" label="Playlists"/>
            <TabItem value="albums" label="Albums"/>
            <TabItem value="artists" label="Artists"/>
        </TabGroup>
    </div>
}