import {memo, useMemo} from "react";
import {useAppSelector} from "../../../Application/hooks";
import {MRT_ColumnDef, MRT_Table, useMantineReactTable} from "mantine-react-table";
import {Track} from "../../../../api/spotifyAPI.ts";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css';
import {Typography} from "../../../../common/components/Typography/Typography.tsx";
import { MdExplicit } from "react-icons/md";

const Tracks = () => {
    const tracks = useAppSelector(state => state.browse.items.tracks)
    // const params = useParams<string>()
    // let trackElements: ReactNode;
    // if(params.query){
    //     if(tracks){
    //         trackElements = tracks.items!.map(track => <div>
    //             {track.name}
    //             <img style={{width: 25}} src={track.album.images[0].url}/>
    //         </div>)
    //     }
    //
    // }
    //
    const columns = useMemo<MRT_ColumnDef<Track>[]>(
        () => [
            {
                accessorKey:'name',
                header: 'Title',
                index: 1,
                Cell: ({row,renderedCellValue }) => (
                    <div style={{ display: 'flex', alignItems: 'center',gap: '8px'}}>
                        <img
                            height={40}
                            src={row.original.album.images[2].url}
                            style={{borderRadius: '5px'}}
                        />
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Typography>{renderedCellValue}</Typography>
                            <Typography variant={'caption'} sx={{display:'flex', gap:'4px', alignItems:'center'}}>{row.original.explicit && <MdExplicit fontSize={20}/>} {row.original.artists[0].name}</Typography>
                        </div>
                    </div>
                ),
            },

            {
                accessorKey: 'album.name',
                header: 'Album',
                index: 2,

            },
        ],
        [],
    );
    const table = useMantineReactTable({
        columns: columns,
        data: tracks?.items ? tracks.items : [],
        enableColumnActions: false,
        enableRowNumbers: true,
        enablePagination: false,

    })
    if (!tracks) {

        return <div>...</div>
    }

    return (
        <div style={{ '--mrt-base-background-color':'transparent',}}>
            <MRT_Table table={table} />
            {/*{trackElements}*/}
        </div>
    );
};

export default memo(Tracks);
