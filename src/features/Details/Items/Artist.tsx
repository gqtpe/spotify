import {FC} from "react";
import {type Artist} from "../../../api/spotifyAPI.ts";


const Artist: FC<{ item: Artist }> = ({item}) => {
    return (
        <div>
            <h1>{item.name}</h1>
            <p>{item.followers.total}</p>

            <img src={item.images[0]?.url} alt={item?.name}/>
        </div>
    );
};

export default Artist;
