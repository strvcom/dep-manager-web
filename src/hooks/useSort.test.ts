import { ascend, prop, reverse } from 'ramda'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

import { useSort, __get__ } from './useSort'

const sorter = __get__('sorter')

describe('hooks/useSort', () => {
  afterEach(cleanup)

  const A = { name: 'A', age: 20, level: 1 }
  const B = { name: 'B', age: 10, level: 2 }
  const C = { name: 'C', age: 30, level: 2 }

  const list = [C, A, B] // shuffled
  const byName = [A, B, C]
  const byAge = [B, A, C]
  const byLevel = [A, C, B] // draw
  const byLevelDesc = [C, B, A] // draw

  const sort = (sortBy?: string, sortDirection?: string) => ({
    sortBy,
    sortDirection
  })

  const config = (
    sortBy?: string,
    sortDirection?: string,
    defaultSort?: any
  ) => ({
    list,
    defaultSort,
    sort: sort(sortBy, sortDirection)
  })

  describe('sorter', () => {
    it('should not sort when empty config', () => {
      expect(sorter(config())).toEqual(list)
    })

    it('should sort by provided key', () => {
      expect(sorter(config('name'))).toEqual(byName)
      expect(sorter(config('age'))).toEqual(byAge)
      expect(sorter(config('level'))).toEqual(byLevel)
    })

    it('should sort by provided direction', () => {
      expect(sorter(config('name', 'ASC'))).toEqual(byName)
      expect(sorter(config('age', 'ASC'))).toEqual(byAge)
      expect(sorter(config('level', 'ASC'))).toEqual(byLevel)

      expect(sorter(config('name', 'DESC'))).toEqual(reverse(byName))
      expect(sorter(config('age', 'DESC'))).toEqual(reverse(byAge))
      expect(sorter(config('level', 'DESC'))).toEqual(byLevelDesc)
    })

    describe('defaultSort', () => {
      const name = ascend(prop('name'))

      it('should fallback to default sort', () => {
        expect(sorter(config(undefined, undefined, name))).toEqual(byName)
      })

      it('should apply default as last sorting method', () => {
        expect(sorter(config('level', 'DESC', name))).toEqual([B, C, A])
      })
    })
  })

  it('should return list, sort setter, and current sort config', () => {
    const { result } = renderHook(() => useSort({ list }))
    const [sorted, setSort, sort] = result.current

    expect(sorted).toBeInstanceOf(Array)
    expect(setSort).toBeInstanceOf(Function)
    expect(sort).toHaveProperty('sortBy')
    expect(sort).toHaveProperty('sortDirection')
  })

  it('should return unmodified list at first', () => {
    const { result } = renderHook(() => useSort({ list }))

    expect(result.current[0]).not.toBe(list) // check immutability
    expect(result.current[0]).toEqual(list)
  })

  it('should return sorted list when initial sort provided', () => {
    const initial: any = { sortBy: 'name', sortDirection: 'ASC' }
    const { result } = renderHook(() => useSort({ list, initial }))
    expect(result.current[0]).toEqual(byName)
  })

  it('should return sorted list when default sort provided', () => {
    const defaultSort = ascend(prop('name'))
    const { result } = renderHook(() => useSort({ list, defaultSort }))
    expect(result.current[0]).toEqual(byName)
  })

  it('should update sorting', () => {
    const und = sort() // { sortBy: undefined, sortDirection: undefined }
    const name = sort('name', 'ASC') // { sortBy: 'name', sortDirection: 'ASC' }
    const nameDesc = sort('name', 'DESC') // { sortBy: 'name', sortDirection: 'DESC' }
    const age = sort('age', 'ASC') // { sortBy: 'age', sortDirection: 'ASC' }

    let sorted: any
    let setSort: any
    let config: any

    const { result } = renderHook(() => useSort({ list }))

      // retrieve state again
    ;[sorted, setSort, config] = result.current
    expect(sorted).toEqual(list) // unsorted
    expect(config).toEqual(und)

    act(() => setSort(name))

    // retrieve state again
    ;[sorted, setSort, config] = result.current
    expect(sorted).toEqual(byName)
    expect(config).toEqual(name)

    act(() => setSort(age))

    // retrieve state again
    ;[sorted, setSort, config] = result.current
    expect(sorted).toEqual(byAge)
    expect(config).toEqual(age)

    act(() => setSort(nameDesc))

    // retrieve state again
    ;[sorted, setSort, config] = result.current
    expect(sorted).toEqual(reverse(byName))
    expect(config).toEqual(nameDesc)
  })

  // @TODO: should we test if memoization is working efficiently?
})
