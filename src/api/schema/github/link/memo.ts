import { ApolloLink, Observable } from 'apollo-link'
import { print } from 'graphql/language'
import { path } from 'ramda'
import { Cache } from 'memory-cache'

const duration =
  process.env.NODE_ENV === 'production'
    ? // 1 hour in production
    60 * 60 * 1000
    : // 1 min in development
    60 * 1000

const cache = new Cache()

const getOperationID = ({ operationName, query, variables }: any) =>
  `${operationName ||
    path(['loc', 'source', 'body'], query) ||
    print(query)}:${JSON.stringify(variables)}`

/**
 * Creates a memoizing link.
 *
 * @ref: https://github.com/apollographql/apollo-link/blob/master/packages/apollo-link-error/src/index.ts
 *
 * @param {String} name A name to use in the logger.
 */
const link = new ApolloLink(
  (operation: any, forward: any): any => {
    const cacheKey = getOperationID(operation)
    const cached: any = cache.get(cacheKey)

    if (cached) {
      return new Observable(observer => {
        cached
          .then((result: any) => {
            observer.next(result)
            observer.complete()
          })
          .catch((err: any) => {
            observer.error(err)
          })
      })
    }

    const deferred = defer()

    cache.put(cacheKey, deferred.promise, duration)

    return new Observable(observer => {
      const sub = forward(operation).subscribe({
        next: (result: any) => {
          deferred.resolve(result) // resolve any listening observables.
          observer.next(result)
        },
        error: (err: any) => {
          deferred.reject(err)
          observer.error(err)
        },
        complete: () => {
          observer.complete()
        }
      })

      return () => {
        sub.unsubscribe()
      }
    })
  }
)

export { link }

const defer = () => {
  const deferred: any = {}

  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  deferred.promise = promise

  return deferred
}
