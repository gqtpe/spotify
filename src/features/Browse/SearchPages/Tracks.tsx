import {memo, useMemo} from "react";
import {appHooks} from "../../Application";
import {type MRT_ColumnDef, MRT_Table, useMantineReactTable} from "mantine-react-table";
import {Track} from "../../../api/spotifyAPI.ts";


const Tracks = () => {
    const {useAppSelector} = appHooks
    const tracks = useAppSelector(state => state.browse.items.tracks)

    const columns = useMemo<MRT_ColumnDef<Track>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Title',
        },
        {
            accessorKey: 'album',
            header: 'Album',
        },
        {
            accessorKey: 'duration_ms',
            header: 'Duration',
        }
    ], [])
    const table = useMantineReactTable({
        columns: columns,
        data: tracks.items
    })
    console.log(tracks)
    if (!tracks || tracks.items.length === 0) {
        return <p>(no tracks)</p>
    }
    //todo: add mantine tables
    return (
        <div>
            <h1>Tracks</h1>
            <MRT_Table table={table}/>
        </div>
    );
};

export default memo(Tracks);