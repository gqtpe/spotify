import {BiLibrary} from "react-icons/bi";
import Typography from "../../common/components/Typography/Typography.tsx";
import styles from "./Library.module.scss";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {IoIosArrowForward, IoMdAdd} from "react-icons/io";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {RxCross2} from "react-icons/rx";
import {SimpleCard} from "../../common/components/SimpleCard/SimpleCard.tsx";
import {useActions, useAppSelector} from "../Application/hooks";
import {userLibraryActions, userLibrarySelectors} from "./index.ts";


export const Library = () => {
    const items = useAppSelector(userLibrarySelectors.selectFilteredItems)
    const filter = useAppSelector(userLibrarySelectors.selectFilter)
    const {setFilter} = useActions(userLibraryActions)


    const cardItems = items.map(item => {
        const {id, name, type, images} = item;
        const img = images && images.length > 0 ? images[0].url : '';

        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

        let subtitle = '';
        if (type === 'playlist') {
            subtitle = `${capitalizedType} - ${item.owner.display_name}`;
        } else if (type === 'album') {
            subtitle = `${capitalizedType} - ${item.artists.map(artist => artist.name).join(', ')}`;
        }

        return (
            <SimpleCard
                key={id}
                title={name}
                subtitle={subtitle}
                img={img}
            />
        );
    })

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
            {filter !== 'all' && <div className={styles.removeTab}><RxCross2 onClick={() => setFilter('all')}/></div>}
            <TabGroup value={filter} onChange={(value) => setFilter(value)}>
                <TabItem value={'playlist'} label={"Playlists"}/>
                <TabItem value={'album'} label={"Albums"}/>
                <TabItem value={'artist'} label={"Artists"} disabled/>
            </TabGroup>
        </div>
        <div className={styles.library__items}>
            {cardItems}
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