import { ApolloLink, from, execute, Observable, toPromise } from 'apollo-link'
import gql from 'graphql-tag'
import getLog from 'debug'

import { link as debug } from './debug'
import { link as auth } from './auth'

jest.mock('debug', () => {
  const log = jest.fn()
  return () => log
})

const log = getLog('')

describe('config/client/link', () => {
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

  describe('auth', () => {
    it('should do nothing when no token available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = {}
      await toPromise(execute(link, { query, context }))

      // @ts-ignore
      const expectedContext = expect.contextContaining({ headers: {} })

      expect(spies.empty).toHaveBeenCalledTimes(1)
      expect(spies.empty).not.toHaveBeenCalledWith(expectedContext)
    })

    it('should inject authorization token when available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = { token: 'value' }
      await toPromise(execute(link, { query, context }))

      // @ts-ignore
      const expectedContext = expect.contextContaining({
        headers: { authorization: `bearer value` },
      })

      expect(spies.empty).toHaveBeenCalledTimes(1)
      expect(spies.empty).toHaveBeenCalledWith(expectedContext)
    })
  })
})
