import {Meta, StoryObj} from "@storybook/react";
import Table from "./Table.tsx";


const meta: Meta<typeof Table> = {
    title: 'common/Table',
    component: Table,
    parameters: {
        backgrounds: {
            values: [
                {name: 'Dark', value: '#121212'},
            ],
            default: 'Dark'
        }
    },
}
export default meta

type Story = StoryObj<typeof Table>

//todo: adjust styles
type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}
const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
]
const columns = [
    {
        header: () => <span>#</span>,
        id: 'rowNumber',
        width: 30,
        cell: info => info.row.index + 1,
    },
    {
        accessorKey: 'firstName',
        header: 'Title',
    },
    {
        accessorKey: 'lastName',
        header: 'Album',
    },
    {
        accessorKey: 'age',
        header: 'duration',
    },
]
export const Example: Story = {
    args: {
        columns: columns,
        data: defaultData,
    },
    render: (args) =>{
        return <Table {...args}/>
    }
}