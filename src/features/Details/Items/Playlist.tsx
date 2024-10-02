import {FC} from "react";
import type {Playlist} from "../../../api/spotifyAPI.ts";
import {PlaylistTrackObject} from "../../../api/spotifyAPI.ts";


const Playlist: FC<{ item: Playlist }> = ({item}) => {
    return (
        <div>
            <h1>{item?.name}</h1>
            <p>owner: {item?.owner.display_name}</p>
            <p>{item?.description}</p>

            <img src={item?.images[0]?.url} alt={item?.name}/>
            <ul>
                {item?.tracks.items.map((track: PlaylistTrackObject) => (
                    <li key={track.track.id}>
                        {track.track.name} by {track.track.type === 'track' && track.track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
