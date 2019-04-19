import { ascend, prop, reverse } from 'ramda'
import { __get__ } from './useSort'

const sorter = __get__('sorter')

describe('hooks', () => {
  describe('useSort', () => {
    describe('sorter', () => {
      const A = { name: 'A', age: 20, level: 1 }
      const B = { name: 'B', age: 10, level: 2 }
      const C = { name: 'C', age: 30, level: 2 }

      const list = [C, A, B] // shuffled
      const byName = [A, B, C]
      const byAge = [B, A, C]
      const byLevel = [A, C, B] // draw
      const byLevelDesc = [C, B, A] // draw

      const config = (
        sortBy?: string,
        sortDirection?: string,
        defaultSort?: any
      ) => ({
        list,
        defaultSort,
        sort: { sortBy, sortDirection }
      })

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
  })
})
