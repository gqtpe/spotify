import {memo, useMemo} from "react";
import {MantineReactTable, type MRT_ColumnDef, MRT_Table, useMantineReactTable} from "mantine-react-table";

type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
    {
        name: {
            firstName: 'Zachary',
            lastName: 'Davis',
        },
        address: '261 Battle Ford',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Robert',
            lastName: 'Smith',
        },
        address: '566 Brakus Inlet',
        city: 'Westerville',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Yan',
        },
        address: '7777 Kuhic Knoll',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'John',
            lastName: 'Upton',
        },
        address: '722 Emie Stream',
        city: 'Huntington',
        state: 'Washington',
    },
    {
        name: {
            firstName: 'Nathan',
            lastName: 'Harris',
        },
        address: '1 Kuhic Knoll',
        city: 'Ohiowa',
        state: 'Nebraska',
    },
];

const Tracks = () => {
    // const tracks = useAppSelector(state=>state.browse.items.tracks)
    // console.log(tracks)
    // if(!tracks || tracks.items.length === 0) {return <p>(no tracks)</p>}
    //
    //
    // const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //     () => [
    //         {
    //             accessorKey: 'name.firstName', //access nested data with dot notation
    //             header: 'First Name',
    //         },
    //         {
    //             accessorKey: 'name.lastName',
    //             header: 'Last Name',
    //         },
    //         {
    //             accessorKey: 'address', //normal accessorKey
    //             header: 'Address',
    //         },
    //         {
    //             accessorKey: 'city',
    //             header: 'City',
    //         },
    //         {
    //             accessorKey: 'state',
    //             header: 'State',
    //         },
    //     ],
    //     [],
    // );
    //todo: add mantine tables
    return (
        <div>
            <h1>Tracks</h1>
            {/*{*/}
            {/*    tracks.items.map(track => <div key={track.id}>{track.name}</div>)*/}
            {/*}*/}
            {/*<MRT_Table table={table} />;;*/}
        </div>
    );
};

export default memo(Tracks);