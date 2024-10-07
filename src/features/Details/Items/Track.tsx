import {FC} from "react";

import type {Track} from "../../../api/types/track.ts";

const Track: FC<{ item: Track }> = ({item}) => {
    return (
        <div>
            <h1>{item.name}</h1>
            <p>owner: {item?.artists.map(t => t.name).join(', ')}</p>
            <p>{item.duration_ms}</p>
            <img src={item.album.images[0].url} alt=""/>
        </div>
    );
};

export default Track;
