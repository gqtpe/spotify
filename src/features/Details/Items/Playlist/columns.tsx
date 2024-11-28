import {ColumnDef} from "@tanstack/react-table";
import type {PlaylistTrackObject} from "../../../../api/types/playlist.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";
import {formatTime} from "../../utils/formatTime.ts";
import {msToTime} from "../../../Player/utils/helpers.ts";
import {FaRegClock} from "react-icons/fa";
import {cutFrom30} from "../../../Browse/utils/cutFrom30.ts";

export const columns: ColumnDef<PlaylistTrackObject>[] = [
    {
        accessorKey: 'track.name',
        header: 'Title',
        cell: ({row}) => {
            return <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <img
                    height={40}
                    src={row.original.track.album.images[0].url}
                    style={{borderRadius: '5px'}}
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='subtitle1'>{cutFrom30(row.original.track.name)}</Typography>
                    <Typography variant='subtitle2' sx={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center'
                    }}>{row.original.track.explicit &&
                        <MdExplicit
                            fontSize={20}/>} {row.original.track.explicit}{row.original.track.artists[0].name}</Typography>
                </div>
            </div>
        },
    },

    {
        header: 'Album',
        cell: ({row}) => (
            <Typography variant='subtitle2' sx={{fontWeight: 'bold'}}>{cutFrom30(row.original.track.album.name)}</Typography>
        )
    },
    {
        accessorKey: 'added_at',
        cell: ({row}) => {
            const date_added = row.original.added_at //YYYY-MM-DDT18:02:29Z
            const time = formatTime(date_added)

            return <Typography variant='subtitle2' sx={{fontWeight: 400}}>{time}</Typography>;
        }

    },
    {
        cell: (track) => {
            const duration = track.row.original.track.duration_ms;
            const time = msToTime(duration)
            return <Typography variant='subtitle2' sx={{fontWeight: 400}}>{time}</Typography>;
        },
        header: () => <FaRegClock/>,
        id: 'duration',
        enableSorting: false,
    },
]