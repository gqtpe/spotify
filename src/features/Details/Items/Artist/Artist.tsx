import {FC} from "react";
import './Artist.scss';
import type {Artist} from "../../../../api/types/artist.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import IconButton from "../../../../common/components/IconButton/IconButton.tsx";
import {FaPlay} from "react-icons/fa6";
import {usePlayAction} from "../../../Player";
import useArtistDetails from "./useArtistDetails.ts";
import Discography from "./components/Discography.tsx";
import TopTracks from "./components/TopTracks.tsx";

const Artist: FC<{ item: Artist }> = ({item}) => {
        const play = usePlayAction()
        const {loading, artistDetails} = useArtistDetails(item.id);

        return (
            <div className="detailed-page artist">
                <div className=" detailed-page__header artist__header ">
                    <div className="detailed-page__image artist__image">
                        <img src={item.images[0]?.url} alt={item?.name}/>
                    </div>
                    <div className="artist__description">
                        <Typography variant='subtitle1'>Artist</Typography>
                        <Typography variant="h1">{item.name}</Typography>
                        <Typography variant="subtitle1">{item.followers.total} monthly listeners</Typography>
                    </div>
                </div>
                <div className="detailed-page__actions artist__actions ">
                    <IconButton fz={24} onClick={() => play({type: 'artist', context_uri: item?.uri})}>
                        <FaPlay/>
                    </IconButton>
                </div>
                {loading === 'succeeded' && artistDetails ?
                    <div className="artist__content">
                        <Typography className="title" variant="h3">Popular</Typography>
                        <TopTracks topTracks={artistDetails.topTracks}/>
                        <Typography className="title" variant="h3">Discography</Typography>
                        <Discography albums={artistDetails.albums}/>
                        <Typography className="title" variant="h3">Appears On</Typography>
                        <Discography albums={artistDetails.appears_on}/>
                        <Typography className="title" variant="h3">Singles</Typography>
                        <Discography albums={artistDetails.singles}/>
                    </div> :
                    <div className="loader"></div>
                }
            </div>
        );
    }
;

export default Artist;
