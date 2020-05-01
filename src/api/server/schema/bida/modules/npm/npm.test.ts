import npm from '.'

describe('api/bida/npm', () => {
  describe('resolvers', () => {
    describe('NPMPackage', () => {
      describe('id', () => {
        const { id: resolve } = npm.resolvers.NPMPackage as any

        it('should retrieve id when available', () => {
          expect(resolve({ id: 'value' })).toBe('value')
        })

        it('should retrieve name when no id available', () => {
          expect(resolve({ name: 'value' })).toBe('value')
        })

        it('should throw when no ir nor name available', () => {
          expect(() => resolve({})).toThrow('must resolve to a valid value')
        })
      })

      describe('dependencies', () => {
        const { dependencies: resolve } = npm.resolvers.NPMPackage as any

        it('should fallback to empty list when no dependencies available', () => {
          expect(resolve({})).toEqual([])
        })

        it('should parse dependency map into list of dependencies', () => {
          const dependencies = {
            first: '^1.0.0',
            second: '2.x.x',
          }

          expect(resolve({ dependencies })).toEqual([
            { name: 'first', version: '^1.0.0' },
            { name: 'second', version: '2.x.x' },
          ])
        })
      })
    })

    describe('NPMDependency', () => {
      describe('id', () => {
        const { id: resolve } = npm.resolvers.NPMDependency as any

        it('should resolve id based on name and version', () => {
          expect(resolve({ name: 'a', version: '^1.0.0' })).toBe('a@^1.0.0')
        })

        it('should throw when no name available', () => {
          expect(() => resolve({ version: '^1.0.0' })).toThrow('must have a name')
        })

        it('should throw when no version available', () => {
          expect(() => resolve({ name: 'a' })).toThrow('must have a version')
        })
      })

      describe('package', () => {
        const { package: resolve } = npm.resolvers.NPMDependency as any

        it('should resolve package from root', () => {
          const dependency = { name: 'a', other: 'b' }
          expect(resolve(dependency)).toEqual(dependency)
        })

        it('should omit version when resolving', () => {
          expect(resolve({ name: 'a', version: '^1.0.0' })).toEqual({
            name: 'a',
          })
        })
      })
    })

    describe('Repository', () => {
      describe('npmPackage', () => {
        const {
          npmPackage: { resolve },
        } = npm.resolvers.Repository as any

        it('should be null when no package available', () => {
          expect(resolve({})).toBe(null)
        })

        it('should parse package blob text', () => {
          expect(resolve({ npmPackageJSON: { text: '{}' } })).toEqual({})
          expect(resolve({ npmPackageJSON: { text: '{"name": "a"}' } })).toEqual({ name: 'a' })
        })
      })
    })
  })
})
