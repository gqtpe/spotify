import {flexRender, getCoreRowModel, getSortedRowModel, useReactTable,} from '@tanstack/react-table';
import {CSSProperties, memo} from "react";
import styles from "./Table.module.scss"
import Typography from '../Typography/Typography';
import {trackColumns} from "../../../features/Browse/SearchPages/Tracks/trackColumns.tsx";


interface TableProps {// Колонки с типом данных
    data: any[]
    enableStickyHeader?: boolean
    enableRowNumbering?: boolean
}

const Table = memo(({data, enableRowNumbering = false}: TableProps) => {
    const table = useReactTable({
        columns: trackColumns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

    });
    const defaultStyle: CSSProperties = {
        position: 'static'
    }

    // const style = enableStickyHeader? sticky: defaultStyle
    return (
        <table className={styles.container}>
            <thead style={defaultStyle}>

            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {enableRowNumbering && <th style={{width: '50px', textAlign: 'center'}}><Typography variant="subtitle1">#</Typography></th>}
                    {headerGroup.headers.map(header => (
                        <th
                            key={header.id}
                            style={{cursor: 'pointer'}}
                            id={header.id}
                        >
                            <Typography variant='subtitle2'>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </Typography>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>

                    {enableRowNumbering && <td style={{width: '50px', textAlign: 'center'}}><Typography variant="subtitle1">{row.index + 1}</Typography></td>}
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