import {BiLibrary} from "react-icons/bi";
import Typography from "../../common/components/Typography/Typography.tsx";
import styles from "./Library.module.scss";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {IoIosArrowForward, IoMdAdd} from "react-icons/io";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {useState} from "react";
import {RxCross2} from "react-icons/rx";


export const Library = () => {

    const [activeTab, setActiveTab] = useState<string | null>(null)
    return <div className={styles.library}>
        <div className={styles.library__header}>
            <BiLibrary fontSize={24}/>
            <Typography className={styles.title}>
                Your Library
            </Typography>
            <IconButton variant="icon" fz={18}>
                <IoMdAdd/>
            </IconButton>
            <IconButton variant="icon" fz={18}>
                <IoIosArrowForward/>
            </IconButton>
        </div>
        <div className={styles.library__tabs}>
            {activeTab && <div className={styles.removeTab}><RxCross2  onClick={() => setActiveTab(null)}/></div>}
            <TabGroup value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabItem value={'playlists'} label={"Playlists"}/>
                <TabItem value={'artists'} label={"Artists"}/>
                <TabItem value={'albums'} label={"Albums"}/>
            </TabGroup>
        </div>
        {/*
        todo:
            1: made loading data and bind with rtk
            1.1: load users playlists, albums, artists
            1.2: add simplified media card component
            1.3: add simple search component
            1.4: add filtering by tab,
        */}
    </div>
}