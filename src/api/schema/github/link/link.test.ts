import { ApolloLink, from, execute, Observable, toPromise } from 'apollo-link'
import gql from 'graphql-tag'
import getLog from 'debug'

import { link as debug } from './debug'

jest.mock('debug', () => {
  const log = jest.fn()
  return () => log
})

const log = getLog('')

describe('api/github/link', () => {
  beforeEach(jest.clearAllMocks)

  const spies = { empty: jest.fn(() => Observable.of(null)) }
  // @ts-ignore
  const links = { empty: new ApolloLink(spies.empty) }

  describe('debug', () => {
    it('should log operation and variables', async () => {
      const link = from([debug, links.empty])
      const variables = { arg: 'value' }
      const query = gql`
        query NAME {
          field
        }
      `

      await toPromise(execute(link, { query, variables }))

      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith(expect.anything(), 'NAME', variables)
    })
  })
})
