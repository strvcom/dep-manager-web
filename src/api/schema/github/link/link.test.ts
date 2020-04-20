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

  describe('auth', () => {
    it('should do nothing when no headers available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = { graphqlContext: {} }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)
      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({ graphqlContext: {} })
      )
      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.not.contextContaining({ graphqlContext: { aws: { event: { headers: {} } } } })
      )
    })

    it('should do nothing when no authorization header is available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = { graphqlContext: {} }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({ graphqlContext: {} })
      )

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.not.contextContaining({
          graphqlContext: { aws: { event: { headers: { authorization: 'token' } } } },
        })
      )
    })

    it('should inject authorization header when available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = {
        graphqlContext: { aws: { event: { headers: { authorization: 'token' } } } },
      }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({
          graphqlContext: { aws: { event: { headers: { authorization: 'token' } } } },
        })
      )
    })
  })
})
