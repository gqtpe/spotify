import {FC} from "react";

import type {Album} from "../../../api/types/album.ts";


const Album: FC<{ item: Album }> = ({item}) => {
    return (
        <div>
            <h1>{item.name}</h1>
            <p>owner: {item?.artists.map(t => t.name).join(', ')}</p>
            <p>{item.release_date}</p>

            <img src={item.images[0]?.url} alt={item?.name}/>
            <ul>
                {item.tracks.items.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.type === 'track' && track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Album;
