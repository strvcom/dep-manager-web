import { useMemo, useState } from 'react'
import { ascend, descend, pick, pipe, prop, sortWith } from 'ramda'

const sortDirections = {
  ASC: ascend,
  DESC: descend
}

const defaultInitial = {
  sortBy: undefined,
  sortDirection: undefined
}

type DefaultSorter = (...args: any[]) => any[]

interface Sort {
  sortBy: string | undefined
  sortDirection: 'DESC' | 'ASC' | undefined
}

interface SorterOptions {
  list: any[]
  sort: Sort
  defaultSort?: DefaultSorter
}

const sorter = ({
  list,
  sort: { sortBy, sortDirection = 'ASC' },
  defaultSort
}: SorterOptions) => {
  const sorters = []

  if (sortBy) sorters.push(sortDirections[sortDirection](prop(sortBy)))
  if (defaultSort) sorters.push(defaultSort)

  return sortWith(sorters, list)
}

interface UseSortOptions {
  list: any[]
  initial?: Sort
  cacheKeys?: string[]
  defaultSort?: DefaultSorter
}

const useSort = ({
  list,
  defaultSort,
  initial = defaultInitial,
  cacheKeys = []
}: UseSortOptions) => {
  const [sort, setSortState] = useState<Sort>(initial)

  const setSort = pipe(
    pick(['sortBy', 'sortDirection']),
    setSortState
  )

  const sortCache = cacheKeys.concat(Object.values(sort))
  const sorted = useMemo(() => sorter({ list, sort, defaultSort }), sortCache)

  return [sorted, setSort, sort]
}

export { useSort }
