import {FC} from 'react';
import TracksTable from "../../../../../common/components/Table/Table.tsx";
import {columns} from "../columns.tsx";
import {Track} from "../../../../../api/types/track.ts";


type Props = {
    topTracks: Track[]
}
const TopTracks: FC<Props> = ({topTracks}) => {
    return (
        <div className="artist__top-tracks">
            {
                <TracksTable columns={columns} data={topTracks} overflow={5}
                             enableHidingFromOverflow
                             enableRowNumbering enableHeaderHiding/>

            }
        </div>
    );
};

export default TopTracks;