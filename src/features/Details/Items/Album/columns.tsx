import {ColumnDef} from "@tanstack/react-table";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {MdExplicit} from "react-icons/md";
import {msToTime} from "../../../Player/utils/helpers.ts";
import {FaRegClock} from "react-icons/fa";
import {cutFrom30} from "../../../Browse/utils/cutFrom30.ts";
import {SimplifiedTrack} from "../../../../api/types/track.ts";

export const columns: ColumnDef<SimplifiedTrack>[] = [
    {
        accessorKey: 'track.name',
        header: 'Title',
        cell: ({row}) => {
            return <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='subtitle1'>{cutFrom30(row.original.name)}</Typography>
                    <Typography variant='subtitle2' sx={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center'
                    }}>{row.original.explicit &&
                        <MdExplicit
                            fontSize={20}/>} {row.original.explicit}{row.original.artists[0].name}</Typography>
                </div>
            </div>
        },
    },
    {
        cell: (track) => {
            const duration = track.row.original.duration_ms;
            const time = msToTime(duration)
            return <Typography variant='subtitle2' sx={{fontWeight: 400}}>{time}</Typography>;
        },
        header: () => <FaRegClock/>,
        id: 'duration',
        enableSorting: false,
    },
]