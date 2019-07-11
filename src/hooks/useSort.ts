import { useMemo, useState } from 'react'
import { ascend, descend, pick, pipe, prop, sortWith } from 'ramda'
import { SortDirectionType } from 'react-virtualized'

const sortDirections = {
  ASC: ascend,
  DESC: descend,
}

interface CommonSortOptions {
  sortBy?: string
  sortDirection?: SortDirectionType
}

interface SorterOptions<T> extends CommonSortOptions {
  list: T[]
  defaultSort?: SortFunction<T>
}

type SortFunction<T> = (a: T, b: T) => number

const sorter = <T>({ list, sortBy, sortDirection = 'ASC', defaultSort }: SorterOptions<T>): T[] => {
  const sorters: SortFunction<T>[] = []
  if (sortBy) {
    const directionSorter = sortDirections[sortDirection]
    sorters.push(directionSorter(prop(sortBy)))
  }
  if (defaultSort) sorters.push(defaultSort)

  return sortWith(sorters, list)
}

export type SortOptionsSetter = React.Dispatch<React.SetStateAction<CommonSortOptions>>

export interface UseSortOptions<T> extends CommonSortOptions {
  list: T[]
  cacheKeys?: string[]
  defaultSort?: SortFunction<T>
}

const useSort = <T>({
  list,
  defaultSort,
  cacheKeys = [],
  sortBy,
  sortDirection,
}: UseSortOptions<T>): [T[], SortOptionsSetter, CommonSortOptions] => {
  const [sortOptions, setSortState] = useState<CommonSortOptions>({ sortBy, sortDirection })

  const setSort = pipe(
    pick(['sortBy', 'sortDirection']),
    setSortState
  )

  const sortCache = cacheKeys.concat(Object.values(sortOptions))
  const sorted = useMemo(() => sorter({ list, defaultSort, ...sortOptions }), sortCache)

  return [sorted, setSort, sortOptions]
}

// @tests
export { sorter }

export { useSort }
