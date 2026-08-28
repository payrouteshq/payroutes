import {
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"

import { ChevronDown, ChevronsUpDown, MoreVertical } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Button } from "../../ui/button"
import { Checkbox } from "../../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Skeleton } from "../../ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"

export interface TableAction<TData> {
  label: string | ((row: TData) => string)
  onClick: (row: TData) => void
  variant?: "default" | "destructive"
  when?: (row: TData) => boolean
  icon?: ReactNode
}

export interface DataTableBulkActionItem<TData> {
  label: ReactNode
  onClick: (rows: TData[]) => void
  variant?: "default" | "destructive"
}

export interface DataTableBulkAction<TData> {
  label: ReactNode
  onClick?: (rows: TData[]) => void
  variant?: "outline" | "destructive"
  icon?: ReactNode
  items?: DataTableBulkActionItem<TData>[]
}

export interface DataTableProps<TData, TValue>
  extends MixinProps<"row", ComponentProps<typeof TableRow>>,
    MixinProps<"checkbox", ComponentProps<typeof Checkbox>>,
    MixinProps<"body", ComponentProps<typeof TableBody>>,
    MixinProps<"cell", ComponentProps<typeof TableCell>>,
    MixinProps<"container", ComponentProps<"div">> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  enableBulkSelect?: boolean
  actions?: ((row: TData) => TableAction<TData>[]) | TableAction<TData>[]
  bulkActions?: DataTableBulkAction<TData>[]
  isLoading?: boolean
  skeletonRowCount?: number
  emptyMessage?: string
  defaultRowSelection?: RowSelectionState
  onRowSelectionChange?: (rows: TData[]) => void
}

function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  enableBulkSelect = false,
  actions,
  bulkActions,
  isLoading = false,
  skeletonRowCount = 5,
  emptyMessage = "No results found.",
  defaultRowSelection,
  onRowSelectionChange,
  ...mixProps
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    defaultRowSelection ?? {}
  )
  const { row, checkbox, body, cell, container } = splitProps(
    mixProps,
    "row",
    "checkbox",
    "body",
    "cell",
    "container"
  )

  const tableColumns = useMemo(() => {
    const next = [...columns]

    if (enableBulkSelect) {
      next.unshift({
        id: "select",
        size: 40,
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            {...checkbox}
            className={cn("translate-y-0.5", checkbox.className)}
          />
        ),
        cell: ({ row: tableRow }) => (
          <Checkbox
            checked={tableRow.getIsSelected()}
            onCheckedChange={(value) => tableRow.toggleSelected(!!value)}
            onClick={(event) => event.stopPropagation()}
            aria-label="Select row"
            {...checkbox}
            className={cn("translate-y-0.5", checkbox.className)}
          />
        ),
      })
    }

    if (actions) {
      next.push({
        id: "actions",
        size: 48,
        enableSorting: false,
        header: () => null,
        cell: ({ row: tableRow }) => {
          const rowActions = (
            typeof actions === "function" ? actions(tableRow.original) : actions
          ).filter((action) => !action.when || action.when(tableRow.original))
          if (!rowActions.length) return null

          return (
            <div
              className="flex justify-end"
              onClick={(event) => event.stopPropagation()}
            >
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-muted-foreground"
                    />
                  }
                  aria-label="Open row actions"
                >
                  <MoreVertical className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {rowActions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      variant={action.variant}
                      onClick={(event) => {
                        event.stopPropagation()
                        action.onClick(tableRow.original)
                      }}
                    >
                      {action.icon}
                      {typeof action.label === "function"
                        ? action.label(tableRow.original)
                        : action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      })
    }

    return next
  }, [actions, checkbox, columns, enableBulkSelect])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(next)
    },
    enableRowSelection: enableBulkSelect,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (original, index) => {
      if (original && typeof original === "object" && "id" in original) {
        return String((original as { id: unknown }).id)
      }
      return String(index)
    },
  })

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((tableRow) => tableRow.original)

  useEffect(() => {
    onRowSelectionChange?.(selectedRows)
  }, [rowSelection])

  if (isLoading) {
    return (
      <DataTableSkeleton
        columns={columns}
        enableBulkSelect={enableBulkSelect}
        actions={actions}
        skeletonRowCount={skeletonRowCount}
      />
    )
  }

  return (
    <div
      data-slot="data-table"
      {...container}
      className={cn("space-y-3", container.className)}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} {...row}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150
                          ? header.getSize()
                          : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <ChevronsUpDown className="size-3.5 text-muted-foreground" />
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
            {selectedRows.length > 0 && bulkActions?.length ? (
              <TableRow className="bg-subtle hover:bg-subtle">
                <TableHead
                  colSpan={tableColumns.length}
                  className="h-auto bg-subtle px-4 py-3 first:pl-6 text-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {bulkActions
                        .filter((action) => action.items?.length)
                        .map((action, index) => (
                          <DropdownMenu key={index}>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="border-border bg-card text-foreground"
                                />
                              }
                            >
                              {action.icon}
                              {action.label}
                              <ChevronDown className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              {action.items?.map((item, itemIndex) => (
                                <DropdownMenuItem
                                  key={itemIndex}
                                  variant={item.variant}
                                  onClick={() => item.onClick(selectedRows)}
                                >
                                  {item.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {bulkActions
                        .filter((action) => !action.items?.length)
                        .map((action, index) => (
                          <Button
                            key={index}
                            type="button"
                            size="sm"
                            variant={
                              action.variant === "destructive"
                                ? "destructive"
                                : "outline"
                            }
                            className={cn(
                              action.variant !== "destructive" &&
                                "border-border bg-card text-foreground"
                            )}
                            onClick={() => action.onClick?.(selectedRows)}
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            ) : null}
          </TableHeader>
          <TableBody {...body}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((tableRow) => (
                <TableRow
                  key={tableRow.id}
                  data-state={tableRow.getIsSelected() ? "selected" : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                  onClick={() => onRowClick?.(tableRow.original)}
                  {...row}
                >
                  {tableRow.getVisibleCells().map((tableCell) => (
                    <TableCell
                      key={tableCell.id}
                      {...cell}
                      className={cn(cell.className)}
                    >
                      {flexRender(
                        tableCell.column.columnDef.cell,
                        tableCell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function DataTableSkeleton<TData, TValue>({
  columns,
  enableBulkSelect = false,
  actions,
  skeletonRowCount = 5,
}: Pick<
  DataTableProps<TData, TValue>,
  "columns" | "enableBulkSelect" | "actions" | "skeletonRowCount"
>) {
  const actionCount = Array.isArray(actions) ? actions.length : actions ? 1 : 0

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {enableBulkSelect ? (
              <TableHead style={{ width: 40 }}>
                <Skeleton className="size-4" />
              </TableHead>
            ) : null}
            {columns.map((column, index) => (
              <TableHead key={column.id ?? `col-${index}`}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
            {actionCount > 0 ? <TableHead style={{ width: 48 }} /> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {enableBulkSelect ? (
                <TableCell>
                  <Skeleton className="size-4" />
                </TableCell>
              ) : null}
              {columns.map((column, colIndex) => (
                <TableCell key={column.id ?? `cell-${rowIndex}-${colIndex}`}>
                  <Skeleton
                    className="h-4"
                    style={{
                      width: `${60 + ((rowIndex * 7 + colIndex * 11) % 40)}%`,
                    }}
                  />
                </TableCell>
              ))}
              {actionCount > 0 ? (
                <TableCell>
                  <Skeleton className="ml-auto size-8 rounded-md" />
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataTable }
