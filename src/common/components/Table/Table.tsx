import {ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable,} from '@tanstack/react-table';
import {CSSProperties, memo} from "react";
import styles from "./Table.module.scss"
import Typography from '../Typography/Typography';
import {usePlayAction} from "../../../features/Player";


interface TableProps {// Колонки с типом данных
    data: any[],
    columns: ColumnDef<any>[]
    enableStickyHeader?: boolean
    enableRowNumbering?: boolean
    enableHeaderHiding?:boolean
    enableHidingFromOverflow?:boolean
    overflow?: number
}
const TracksTable = memo(({data, columns, enableRowNumbering = false, enableHeaderHiding, overflow, enableHidingFromOverflow}: TableProps) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

    });
    const defaultStyle: CSSProperties = {
        position: 'static'
    };

    const play = usePlayAction();
    const [hidingFromOverflow, setHidingFromOverflow] = useState(enableHidingFromOverflow);

    // Фильтруем строки, исключая скрытые
    const visibleRows = hidingFromOverflow && overflow
        ? table.getRowModel().rows.slice(0, overflow)
        : table.getRowModel().rows;

    return (
        <table className={styles.container}>
            <thead style={defaultStyle}>
            {!enableHeaderHiding && table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {enableRowNumbering &&
                        <th style={{width: '50px', textAlign: 'center'}}>
                            <Typography variant="subtitle1">#</Typography>
                        </th>}
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
            {visibleRows.map((row, visibleIndex) => (
                <tr key={row.id} onClick={() => play({type: 'track', uris: [row.original.uri]})}>
                    {enableRowNumbering &&
                        <td style={{width: '50px', textAlign: 'center'}}>
                            <Typography variant="subtitle1">{visibleIndex + 1}</Typography>
                        </td>
                    }
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            {overflow && (
                <tr>
                    <td colSpan={columns.length + (enableRowNumbering ? 1 : 0)} style={{textAlign: 'center'}}>
                        <div onClick={() => setHidingFromOverflow(state => !state)}>Show {hidingFromOverflow?'more':'less'}</div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
});


export default memo(TracksTable)