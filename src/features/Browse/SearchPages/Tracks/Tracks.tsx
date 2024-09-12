import {appHooks} from "../../../Application";
import {browseSelectors} from "../../"
import {memo, useMemo} from "react";
import {Track} from "../../../../api/spotifyAPI.ts";
import {Typography} from "../../../../common/components/Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";
import {MRT_ColumnDef, MRT_Table, useMantineReactTable} from "mantine-react-table";
import styles from '../../Browse.module.scss'
//
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import {FaRegClock} from "react-icons/fa";

const Tracks = () => {
    const tracks = appHooks.useAppSelector(browseSelectors.selectTracks)
    const columns = useMemo<MRT_ColumnDef<Track>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Title',
                index: 1,

                Cell: ({row, renderedCellValue}) => (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <img
                            height={40}
                            src={row.original.album.images[2].url}
                            style={{borderRadius: '5px'}}
                        />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography>{renderedCellValue}</Typography>
                            <Typography variant={'caption'} sx={{
                                display: 'flex',
                                gap: '4px',
                                alignItems: 'center'
                            }}>{row.original.explicit &&
                                <MdExplicit fontSize={20}/>} {row.original.artists[0].name}</Typography>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'album.name',
                header: 'Album',
                index: 2,
                enableSorting: false

            },
            {
                accessorFn: (track)=> {
                    const minute = Math.floor(track.duration_ms / 60000)
                    let second = Math.floor((track.duration_ms / 1000) % 60) + ''
                    if (second.length === 1) {
                        second = '0' + second
                    }
                    return <Typography variant={'caption'}>{minute+ ':' + second}</Typography>
                },
                Header: <FaRegClock />,
                header:  '',
                id: 'header',
                enableSorting: false,
            }
        ],
        [],
    );
    const table = useMantineReactTable({
        columns: columns,
        data: tracks?.items ? tracks.items : [],
        enableColumnActions: false,
        enableRowNumbers: true,
        enablePagination: false,
        enableStickyHeader: true,
mantineTableHeadProps: {
            style: {
                '--mrt-base-background-color': '#1f1f1f'
            }
}
    })
    if (!tracks) {
        return <div>...</div>
    }

    return (
        <div className={styles.tracks}>
            <MRT_Table table={table} style={{'--mrt-base-background-color': 'transparent'}}/>

        </div>
    );
};

export default memo(Tracks);
