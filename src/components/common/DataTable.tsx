import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  sortAccessor?: (row: T) => string | number
  className?: string
  headerClassName?: string
}

export interface SortState {
  key: string
  direction: 'asc' | 'desc'
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  sort,
  onSortChange,
  emptyMessage = 'No results match your filters.',
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowId: (row: T) => string
  sort?: SortState
  onSortChange?: (key: string) => void
  emptyMessage?: string
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map((column) => {
            const isSortable = Boolean(column.sortAccessor && onSortChange)
            const isActive = sort?.key === column.key
            return (
              <TableHead
                key={column.key}
                className={cn(column.headerClassName, isSortable && 'cursor-pointer select-none')}
                onClick={isSortable ? () => onSortChange!(column.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {column.header}
                  {isSortable &&
                    (isActive ? (
                      sort?.direction === 'asc' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-3 w-3 opacity-40" />
                    ))}
                </span>
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={getRowId(row)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export function sortRows<T>(rows: T[], sort: SortState | undefined, columns: DataTableColumn<T>[]): T[] {
  if (!sort) return rows
  const column = columns.find((c) => c.key === sort.key)
  if (!column?.sortAccessor) return rows
  const { sortAccessor } = column
  const direction = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    const av = sortAccessor(a)
    const bv = sortAccessor(b)
    if (av < bv) return -1 * direction
    if (av > bv) return 1 * direction
    return 0
  })
}
