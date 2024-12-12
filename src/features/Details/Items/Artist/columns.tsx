import {ColumnDef} from "@tanstack/react-table";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {msToTime} from "../../../Player/utils/helpers.ts";
import {FaRegClock} from "react-icons/fa";
import {Track} from "../../../../api/types/track.ts";
import Card from "../../../../common/components/Cards/Card/Card.tsx";

export const columns: ColumnDef<Track>[] = [
    {
        accessorKey: 'track.name',
        header: 'Title',
        cell: ({row}) => {
            return <Card
                image={row.original.album.images[0].url}
                title={row.original.name}
                subtitle={row.original.artists.map(artist=>artist.name).join(', ')}
                explicit={row.original.explicit}
                variant="small-"
                titleLink={`/track/${row.original.id}`}
                dense="none"
            />
        },
    },
    {
        header: '',
        accessorKey: 'track.album.name',
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