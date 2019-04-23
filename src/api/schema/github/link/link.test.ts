import { ApolloLink, from, execute, Observable, toPromise } from 'apollo-link'
import gql from 'graphql-tag'

import { link as debug, __set__ as __set__debug__ } from './debug'

describe('api/github/link', () => {
  const links = { empty: new ApolloLink(() => Observable.of(null)) }

  describe('debug', () => {
    const log = jest.fn()
    const link = from([debug, links.empty])

    __set__debug__('debug', log)

    it('should log operation and variables', async () => {
      const query = gql`
        query NAME {
          field
        }
      `

      const variables = { arg: 'value' }
      const result = await toPromise(execute(link, { query, variables }))

      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith(expect.anything(), 'NAME', variables)
    })
  })
})
