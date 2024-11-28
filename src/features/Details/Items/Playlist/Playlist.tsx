import {FC} from "react";
import type {Playlist} from "../../../../api/types/playlist.ts";
import TracksTable from "../../../../common/components/Table/Table.tsx";
import {columns} from "./columns.tsx";
import "./Playlist.scss";
import Typography from "../../../../common/components/Typography/Typography.tsx";


const Playlist: FC<{ item: Playlist }> = ({item}) => {
    return (
        <div className="playlist">
            {/*<h1>{item?.name}</h1>*/}
            {/*<p>owner: {item?.owner.display_name}</p>*/}
            {/*<p>{item?.description}</p>*/}
            <div className="playlist__header">
                <div className="playlist__image">
                    <img src={item?.images[0]?.url} alt={item?.name}/>
                </div>
                <div className="playlist__description">
                    <Typography variant='subtitle1'>Playlist</Typography>
                    <Typography className="playlist__title" variant='h1'>{item?.name}</Typography>
                    <Typography variant='subtitle1' sx={{color: 'var(--text400)'}}>{item?.description}</Typography>
                    <div className="playlist__stats">
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-100)'}}>{item?.owner.display_name}</Typography>•
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-400)'}}>{item?.followers.total} saves</Typography>•
                        <Typography variant='subtitle1'
                                    sx={{color: 'var(--text-400)'}}>{item?.tracks.total} tracks</Typography>
                    </div>
                </div>
            </div>
            <div className="playlist__content">
                <div className="playlist__actions">
                    ...actions
                </div>
                <div className="playlist__table">
                    <TracksTable columns={columns} data={item?.tracks.items}/>

                </div>
            </div>

        </div>
    );
};

export default Playlist;
