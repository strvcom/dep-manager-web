import {
  ApolloLink,
  Operation,
  NextLink,
  Observable,
  FetchResult
} from 'apollo-link'
import { hasDirectives, addTypenameToDocument } from 'apollo-utilities'
import removeRestDirective from './removeRestDirective'

import { graphql } from 'graphql-anywhere/lib/async'
import { Resolver } from 'graphql-anywhere'

export type ResolverMap = Record<any, Resolver | undefined>

const resolver: Resolver = async (
  fieldName,
  rootValue,
  args,
  context: ResolverMap,
  info
) => {
  const { resultKey, directives } = info
  if (directives && 'rest' in directives) {
    const restResolver = context[fieldName]
    if (!(restResolver instanceof Function)) {
      throw new TypeError(
        `function expected as resolver for ${fieldName}, instead received ${typeof restResolver}`
      )
    }
    return restResolver(fieldName, rootValue, args, undefined, info)
  }
  return rootValue[resultKey]
}

export default class RestLink extends ApolloLink {
  constructor (public resolverMap: ResolverMap) {
    super()
  }
  public request (operation: Operation, forward?: NextLink) {
    const isRestQuery = hasDirectives(['rest'], operation.query)
    if (!isRestQuery && forward) return forward(operation)
    const nonRestQuery = removeRestDirective(operation.query)
    const typeNamedQuery = addTypenameToDocument(operation.query)
    const observable =
      nonRestQuery && forward
        ? // tslint:disable-next-line:prefer-object-spread
        forward(Object.assign(operation, { query: nonRestQuery }))
        : Observable.of<FetchResult>({ data: {} })
    return observable.flatMap(
      ({ data, ...rest }) =>
        new Observable<FetchResult>(subscriber => {
          graphql(
            resolver,
            typeNamedQuery,
            data,
            this.resolverMap,
            operation.variables
          )
            .then(resolvedData => {
              subscriber.next({ data: resolvedData, ...rest })
              subscriber.complete()
            })
            .catch(err => {
              if (err.name === 'AbortError') return
              if (err.result && err.result.errors) {
                subscriber.next(err.result)
              }
              subscriber.error(err)
            })
        })
    )
  }
}
