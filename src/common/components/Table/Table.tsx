import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {CSSProperties, memo} from "react";
import styles from "./Table.module.scss"
import Typography from '../Typography/Typography';
interface TableProps {
    columns: ColumnDef<any>[] // Колонки с типом данных
    data: any[]
    enableStickyHeader?: boolean
}

const Table = memo(({columns, data, enableStickyHeader = true}: TableProps) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const sticky: CSSProperties = {
        position: 'sticky',
        top:  48
    }
    const defaultStyle: CSSProperties = {
        position: 'static'
    }
    const style = enableStickyHeader? sticky: defaultStyle
    return (
        <table className={styles.container}>
            <thead style={style}>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            style={{cursor: 'pointer'}}
                        >
                            <Typography variant={'body1'}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </Typography>
                            {header.column.getIsSorted()
                                ? header.column.getIsSorted() === 'desc'
                                    ? ' 🔽'
                                    : ' 🔼'
                                : null}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
});



export default memo(Table)