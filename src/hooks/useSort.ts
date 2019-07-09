import { useMemo, useState } from 'react'
import { ascend, descend, pick, pipe, prop, sortWith } from 'ramda'

const sortDirections = {
  ASC: ascend,
  DESC: descend,
}

const defaultInitial = {
  sortBy: undefined,
  sortDirection: undefined,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SortList = any[]
export type Sorter = (...args: SortList) => number
export type SortDirection = 'DESC' | 'ASC'
export type SortSetter = React.Dispatch<React.SetStateAction<ISort>>

export interface ISort {
  sortBy?: string
  sortDirection?: SortDirection
}

interface ISorterOptions {
  list: SortList
  sort: ISort
  defaultSort?: Sorter
}

const sorter = ({
  list,
  sort: { sortBy, sortDirection = 'ASC' },
  defaultSort,
}: ISorterOptions): SortList => {
  const sorters = []

  if (sortBy) sorters.push(sortDirections[sortDirection](prop(sortBy)))
  if (defaultSort) sorters.push(defaultSort)

  return sortWith(sorters, list)
}

export interface IUseSortOptions {
  list: SortList
  initial?: ISort
  cacheKeys?: string[]
  defaultSort?: Sorter
}

type IUseSortResult = [SortList, SortSetter, ISort]

const useSort = ({
  list,
  defaultSort,
  initial = defaultInitial,
  cacheKeys = [],
}: IUseSortOptions): IUseSortResult => {
  const [sort, setSortState] = useState<ISort>(initial)

  const setSort = pipe(
    pick(['sortBy', 'sortDirection']),
    setSortState
  )

  const sortCache = cacheKeys.concat(Object.values(sort))
  const sorted = useMemo(() => sorter({ list, sort, defaultSort }), sortCache)

  return [sorted, setSort, sort]
}

// @tests
export { sorter }

export { useSort }
