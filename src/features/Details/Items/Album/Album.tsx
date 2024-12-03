import {FC} from "react";
import "./Album.scss";
import type {Album} from "../../../../api/types/album.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import TracksTable from "../../../../common/components/Table/Table.tsx";
import {columns} from "./columns.tsx";


const Album: FC<{ item: Album }> = ({item}) => {
    const play = usePlayAction()
    //save
    return (
        <div className="album">
            <div className="album__header detailed-page-header">
                <div className="album__image detailed-page-image">
                    <img src={item?.images[0].url} alt={item?.name}/>
                </div>
                <div className="album__description">
                    <Typography variant='subtitle1'>Album</Typography>
                    <Typography className="album__title" variant='h1'>{item.name}</Typography>
                    <div className="album__details">
                        <Typography variant='subtitle1'>
                            {item.artists[0].name}
                        </Typography>•
                        <Typography variant='subtitle1' sx={{color: 'var(--text400)'}}>
                            {item.release_date.slice(0, 4)}
                        </Typography>
                        •
                        <Typography sx={{color: 'var(--text400)'}} variant='subtitle1'>
                            {item.total_tracks} tracks
                        </Typography>

                    </div>
                </div>
            </div>
            <div className="album__content">
                <div className="album__actions detailed-actions">
                    ...actions
                </div>
                <div className="album__table detailed-page-table">
                    <TracksTable columns={columns} data={item?.tracks.items} enableRowNumbering/>

                </div>
            </div>

        </div>
    );
};

export default Album;
