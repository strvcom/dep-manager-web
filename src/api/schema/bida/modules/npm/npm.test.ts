import npm from './'

describe('api/bida/npm', () => {
  describe('resolvers', () => {
    describe('NPMPackage', () => {
      describe('id', () => {
        const { id: resolver } = npm.resolvers.NPMPackage

        it('should retrieve id when available', () => {
          expect(resolver({ id: 'value' })).toBe('value')
        })

        it('should retrieve name when no id available', () => {
          expect(resolver({ name: 'value' })).toBe('value')
        })

        it('should throw when no ir nor name available', () => {
          expect(() => resolver({})).toThrow('must resolve to a valid value')
        })
      })

      describe('dependencies', () => {
        const { dependencies: resolver } = npm.resolvers.NPMPackage

        it('should fallback to empty list when no dependencies available', () => {
          expect(resolver({})).toEqual([])
        })

        it('should parse dependency map into list of dependencies', () => {
          const dependencies = {
            first: '^1.0.0',
            second: '2.x.x'
          }

          expect(resolver({ dependencies })).toEqual([
            { name: 'first', version: '^1.0.0' },
            { name: 'second', version: '2.x.x' }
          ])
        })
      })
    })
  })
})
