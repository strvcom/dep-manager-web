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
    })
  })
})
