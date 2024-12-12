import {ColumnDef} from "@tanstack/react-table";
import Typography from "../../../../common/components/Typography/Typography.tsx";
import {formatTime} from "../../utils/formatTime.ts";
import {msToTime} from "../../../Player/utils/helpers.ts";
import {FaRegClock} from "react-icons/fa";
import {cutFrom30} from "../../../Browse/utils/cutFrom30.ts";
import Card from "../../../../common/components/Cards/Card/Card.tsx";
import {Track} from "../../../../api/types/track.ts";

export const columns: ColumnDef<Track & { added_at: string }>[] = [
    {
        accessorKey: 'track.name',
        header: 'Title',
        cell: ({row}) => {
            return <Card
                image={row.original.album.images[0].url}
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
        header: 'Album',
        cell: ({row}) => (
            <Typography variant='subtitle2'
                        sx={{fontWeight: 'bold'}}>{cutFrom30(row.original.album.name)}</Typography>
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
            const duration = track.row.original.duration_ms;
            const time = msToTime(duration)
            return <Typography variant='subtitle2' sx={{fontWeight: 400}}>{time}</Typography>;
        },
        header: () => <FaRegClock/>,
        id: 'duration',
        enableSorting: false,
    },
]