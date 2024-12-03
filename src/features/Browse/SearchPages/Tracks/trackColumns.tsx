import {ColumnDef} from "@tanstack/react-table";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {FaRegClock} from "react-icons/fa";
import {Track} from "../../../../api/types/track.ts";
import {MdExplicit} from "react-icons/md";


export const trackColumns: ColumnDef<Track>[] = [
    {
        accessorKey: 'name',
        header: 'Title',
        cell: ({row}) => (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <img
                    height={40}
                    src={row.original.album.images[2].url}
                    style={{borderRadius: '5px'}}
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='subtitle1'>{row.original.name}</Typography>
                    <Typography variant='subtitle2' sx={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center'
                    }}>{row.original.explicit &&
                        <MdExplicit fontSize={20}/>} {row.original.artists[0].name}</Typography>
                </div>
            </div>
            // <Card variant="small" image={row.original.album.images[2].url} link={`tracks/${row.original.id}`}
            //       explicit={row.original.explicit} subtitle={row.original.artists.map(t=>t.name).join(', ')}
            //       title={row.original.name}/>
        ),
    },
    {
        accessorKey: 'album.name',
        header: 'Album',
        cell: ({row}) => (
            <Typography variant='subtitle2' sx={{fontWeight: 'bold'}}>{row.original.album.name}</Typography>
        )
    },
    {
        cell: (track) => {
            const duration = track.row.original.duration_ms;
            const minute = Math.floor(duration / 60000);
            let second = Math.floor((duration / 1000) % 60) + '';
            if (second.length === 1) {
                second = '0' + second;
            }
            return <Typography variant={'caption'}>{minute + ':' + second}</Typography>;
        },
        header: () => <FaRegClock/>,
        id: 'duration',
        enableSorting: false,
    },
];
