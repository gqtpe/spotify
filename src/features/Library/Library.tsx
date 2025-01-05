import {BiLibrary} from "react-icons/bi";
import Typography from "../../common/components/Typography/Typography.tsx";
import "./Library.scss";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {IoIosArrowForward, IoMdAdd} from "react-icons/io";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import {RxCross2} from "react-icons/rx";
import {useActions, useAppSelector} from "../Application/hooks";
import {userLibraryActions, userLibrarySelectors} from "./index.ts";
import Card from "../../common/components/Cards/Card/Card.tsx";
import {usePlayAction} from "../Player";
import getSubtitleLink from "../../common/utils/getSubtitleLink.ts";
import getSubtitleForCard from "../../common/utils/getSubtitleForCard.ts";


export const Library = () => {
    const items = useAppSelector(userLibrarySelectors.selectFilteredItems)
    const filter = useAppSelector(userLibrarySelectors.selectFilter)
    const {setFilter} = useActions(userLibraryActions)
    const play = usePlayAction()
    const cardItems = items.map(item => {
        if (!item) {
            return
        }
        const {id, name, type, images} = item;
        const img = images && images.length > 0 ? images[0].url : '';

        return (
            <Card
                key={id}
                title={name}
                subtitle={getSubtitleForCard({item})}
                image={img}
                variant="small"
                link={`/${type}/${id}`}
                onPlay={() => play({type: item.type, context_uri: item.uri, offset: {position: 0}})}
                subtitleLink={getSubtitleLink({item})}
            />
        );
    })
    return <div className="library">
        <div className="library__header">
            <BiLibrary fontSize={24} className="library__logo"/>
            <Typography variant="subtitle1" className="library__title">
                Your Library
            </Typography>
            <div className="library__actions">
                <IconButton variant="icon" fz={18}>
                    <IoMdAdd/>
                </IconButton>
                <IconButton variant="icon" fz={18}>
                    <IoIosArrowForward/>
                </IconButton>
            </div>
        </div>
        <div className="library__tabs">
            {filter !== 'all' && <div className="tabs__close"><RxCross2 onClick={() => setFilter('all')}/></div>}
            <TabGroup value={filter} handleChange={(value) => setFilter(value)} style={{padding: 0}}>
                <TabItem value={'playlist'} label={"Playlists"}/>
                <TabItem value={'album'} label={"Albums"}/>
                <TabItem value={'artist'} label={"Artists"} disabled/>
            </TabGroup>
        </div>
        <div className="library__items">
            <Card image='https://misc.scdn.co/liked-songs/liked-songs-300.png'
                  subtitle="By t4sya"
                  variant="small"
                  title="Liked Songs"
                  link="/collection/tracks"
            />
            {cardItems}
        </div>
        {/*
        todo:
            1.3: add simple search component
        */}
    </div>
}