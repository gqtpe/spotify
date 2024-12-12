import {ColumnDef} from "@tanstack/react-table";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {msToTime} from "../../../Player/utils/helpers.ts";
import {FaRegClock} from "react-icons/fa";
import {SimplifiedTrack} from "../../../../api/types/track.ts";
import Card from "../../../../common/components/Cards/Card/Card.tsx";

export const columns: ColumnDef<SimplifiedTrack>[] = [
    {
        accessorKey: 'track.name',
        header: 'Title',
        cell: ({row}) => {
            return <Card
                title={row.original.name}
                subtitle={row.original.artists.map(artist => artist.name).join(', ')}
                explicit={row.original.explicit}
                variant="small-"
                titleLink={`/track/${row.original.id}`}
                subtitleLink={`/artist/${row.original.artists[0].id}`}
                dense="none"
            />
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