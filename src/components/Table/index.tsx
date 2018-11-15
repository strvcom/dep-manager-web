import React, { useCallback } from 'react'
import * as Virtual from 'react-virtualized'
import { Wrapper } from './styled'
import './Table.css'
import cn from 'classnames'
import { OverscanIndicesGetter } from 'react-virtualized/dist/es/Grid'

export interface TableProps {
  'aria-readonly'?: boolean
  /**
   * Set the width of the inner scrollable container to 'auto'.
   * This is useful for single-column Grids to ensure that the column doesn't extend below a vertical scrollbar.
   */
  autoContainerWidth?: boolean
  /**
   * Responsible for rendering a group of cells given their index ranges.
   * Should implement the following interface: ({
   *   cellCache: Map,
   *   cellRenderer: Function,
   *   columnSizeAndPositionManager: CellSizeAndPositionManager,
   *   columnStartIndex: number,
   *   columnStopIndex: number,
   *   isScrolling: boolean,
   *   rowSizeAndPositionManager: CellSizeAndPositionManager,
   *   rowStartIndex: number,
   *   rowStopIndex: number,
   *   scrollLeft: number,
   *   scrollTop: number
   * }): Array<PropTypes.node>
   */
  cellRangeRenderer?: Virtual.GridCellRangeRenderer
  /** Unfiltered props for the Grid container. */
  containerProps?: object
  /** ARIA role for the cell-container.  */
  containerRole?: string
  /** Optional inline style applied to inner cell-container */
  containerStyle?: React.CSSProperties
  /**
   * Used to estimate the total width of a Grid before all of its columns have actually been measured.
   * The estimated total width is adjusted as columns are rendered.
   */
  estimatedColumnSize?: number
  /**
   * Exposed for testing purposes only.
   */
  getScrollbarSize?: () => number
  /**
   * Override internal is-scrolling state tracking.
   * This property is primarily intended for use with the WindowScroller component.
   */
  isScrolling?: boolean
  /**
   * Optional renderer to be used in place of rows when either :rowCount or :columnCount is 0.
   */
  noContentRenderer?: () => React.ReactNode
  /**
   * Called whenever a horizontal or vertical scrollbar is added or removed.
   * ({ horizontal: boolean, size: number, vertical: boolean }): void
   */
  onScrollbarPresenceChange?: (params: Virtual.ScrollbarPresenceParams) => any
  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered?: (params: Virtual.SectionRenderedParams) => any
  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnCount?: number
  /**
   * Calculates the number of cells to overscan before and after a specified range.
   * This function ensures that overscanning doesn't exceed the available cells.
   * Should implement the following interface: ({
   *   cellCount: number,
   *   overscanCellsCount: number,
   *   scrollDirection: number,
   *   startIndex: number,
   *   stopIndex: number
   * }): {overscanStartIndex: number, overscanStopIndex: number}
   */
  overscanIndicesGetter?: OverscanIndicesGetter
  /**
   * ARIA role for the grid element.
   */
  role?: string
  /** Wait this amount of time after the last scroll event before resetting Grid `pointer-events`. */
  scrollingResetTimeInterval?: number
  /** Horizontal offset. */
  scrollLeft?: number
  /**
   * Controls scroll-to-cell behavior of the Grid.
   * The default ("auto") scrolls the least amount possible to ensure that the specified cell is fully visible.
   * Use "start" to align cells to the top/left of the Grid and "end" to align bottom/right.
   */
  scrollToAlignment?: Virtual.Alignment
  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn?: number
  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow?: number
  'aria-label'?: string
  deferredMeasurementCache?: Virtual.CellMeasurerCache
  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight?: boolean
  /** One or more Columns describing the data displayed in this row */
  children?: React.ReactNode
  /** Optional CSS class name */
  className?: string
  /** Disable rendering the header at all */
  disableHeader?: boolean
  /**
   * Used to estimate the total height of a Table before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize?: number
  /** Optional custom CSS class name to attach to inner Grid element. */
  gridClassName?: string
  /** Optional inline style to attach to inner Grid element. */
  gridStyle?: any
  /** Optional CSS class to apply to all column headers */
  headerClassName?: string
  /**
   * Responsible for rendering a table row given an array of columns:
   * Should implement the following interface: ({
   *   className: string,
   *   columns: any[],
   *   style: any
   * }): PropTypes.node
   */
  headerRowRenderer?: Virtual.TableHeaderRowRenderer
  /** Optional custom inline style to attach to table header columns. */
  headerStyle?: any
  /** Optional id */
  id?: string
  /** Optional renderer to be used in place of table body rows when rowCount is 0 */
  noRowsRenderer?: () => void
  /**
   * Optional callback when a column's header is clicked.
   * ({ columnData: any, dataKey: string }): void
   */
  onHeaderClick?: (params: Virtual.HeaderMouseEventHandlerParams) => void
  /**
   * Callback invoked when a user clicks on a table row.
   * ({ index: number }): void
   */
  onRowClick?: (info: Virtual.RowMouseEventHandlerParams) => void
  /**
   * Callback invoked when a user double-clicks on a table row.
   * ({ index: number }): void
   */
  onRowDoubleClick?: (info: Virtual.RowMouseEventHandlerParams) => void
  /**
   * Callback invoked when the mouse leaves a table row.
   * ({ index: number }): void
   */
  onRowMouseOut?: (info: Virtual.RowMouseEventHandlerParams) => void
  /**
   * Callback invoked when a user moves the mouse over a table row.
   * ({ index: number }): void
   */
  onRowMouseOver?: (info: Virtual.RowMouseEventHandlerParams) => void
  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered?: (
    info: Virtual.IndexRange & Virtual.OverscanIndexRange
  ) => void
  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll?: (info: Virtual.ScrollEventData) => void
  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount?: number
  /**
   * Callback responsible for returning a data row given an index.
   * ({ index: number }): any
   */
  rowGetter?: (info: Virtual.Index) => any
  /** Number of rows in table. */
  rowCount: number
  /**
   * Responsible for rendering a table row given an array of columns:
   * Should implement the following interface: ({
   *   className: string,
   *   columns: Array,
   *   index: number,
   *   isScrolling: boolean,
   *   onRowClick: ?Function,
   *   onRowDoubleClick: ?Function,
   *   onRowMouseOver: ?Function,
   *   onRowMouseOut: ?Function,
   *   rowData: any,
   *   style: any
   * }): PropTypes.node
   */
  rowRenderer?: Virtual.TableRowRenderer
  rowClassName?: string
  /** Optional custom inline style to attach to table rows. */
  rowStyle?:
    | React.CSSProperties
    | ((info: Virtual.Index) => React.CSSProperties)
  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex?: number
  /** Vertical offset. */
  scrollTop?: number
  /**
   * Sort function to be called if a sortable header is clicked.
   * ({ sortBy: string, sortDirection: SortDirection }): void
   */
  sort?: (
    info: { sortBy: string; sortDirection: Virtual.SortDirectionType }
  ) => void
  /** Table data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy?: string
  /** Table data is currently sorted in this direction (if it is sorted at all) */
  sortDirection?: Virtual.SortDirectionType
  /** Optional inline style */
  style?: React.CSSProperties
  /** Tab index for focus */
  tabIndex?: number | null
}

const Table = (props: TableProps) => {
  const rowClassName = useCallback(
    ({ index }: Virtual.Index) => cn(index >= 0 && 'row', props.rowClassName),
    [props.rowClassName]
  )
  return (
    <Wrapper>
      <Virtual.AutoSizer disableHeight>
        {({ width }) => (
          <Virtual.Table
            width={width}
            height={50 + 75 * props.rowCount}
            headerHeight={50}
            rowHeight={75}
            rowClassName={rowClassName}
            {...props}
          />
        )}
      </Virtual.AutoSizer>
    </Wrapper>
  )
}

export const Column = Virtual.Column
export type Index = Virtual.Index

export default React.memo(Table)
