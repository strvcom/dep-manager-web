import React from 'react'
import { Omit } from 'utility-types'
import {
  MutationOptions,
  QueryOptions,
  ApolloClient,
  OperationVariables,
  ApolloQueryResult,
  ObservableQuery
} from 'apollo-client'
import { DocumentNode } from 'graphql'
import deepEqual from 'deep-equal'

const ApolloContext = React.createContext<ApolloClient<any>>(undefined!)

export interface ApolloProviderProps {
  children: React.ReactNode
  client: ApolloClient<any>
}

export const ApolloProvider = React.memo((props: ApolloProviderProps) => (
  <ApolloContext.Provider value={props.client}>
    {props.children}
  </ApolloContext.Provider>
))

export function useClient<C = any> () {
  return React.useContext(ApolloContext) as ApolloClient<C>
}

export type QueryHookOptions < V > = Omit<QueryOptions<V>, 'query'>

interface ObservableQueryCache<D = any> {
  observable: ObservableQuery<D>
  query: DocumentNode
  options: QueryHookOptions<any>
}

const caches: ObservableQueryCache[] = []

function useObservableQueryCache<D> (
  query: DocumentNode,
  options: QueryHookOptions<any>
) {
  const client = useClient()
  // tslint:disable-next-line:no-shadowed-variable
  for (const cache of caches) {
    if (
      deepEqual(cache.query.loc, query.loc) &&
      deepEqual(cache.options, options)
    ) { return cache as ObservableQueryCache<D> }
  }
  const cache: ObservableQueryCache<D> = {
    observable: client.watchQuery<D>({ ...options, query }),
    query,
    options
  }
  caches.push(cache)
  return cache
}

export function useQuery<D = any, V = OperationVariables> (
  query: DocumentNode,
  options: QueryHookOptions<V> = {},
  inputs: ReadonlyArray<any> = []
) {
  const { observable } = useObservableQueryCache<D>(query, options)
  const initialResult = React.useMemo(
    () =>
      observable.getLastResult() ||
      (observable.currentResult() as ApolloQueryResult<D>),
    [observable]
  )
  const [result, setResult] = React.useState(initialResult)
  const [error, setError] = React.useState<Error>(undefined!)
  React.useEffect(() => {
    const subscription = observable.subscribe({
      next (nextResult) {
        if (
          observable.isDifferentFromLastResult(nextResult) ||
          nextResult.data !== result.data
        ) {
          setResult(nextResult)
        }
      },
      error: setError
    })
    return () => subscription.unsubscribe()
  }, inputs)
  if (error) throw error
  return result
}

export type MutationHookOptions < D , V > = Omit<MutationOptions<D, V>, 'mutation'>

export function useMutation<D, V> (
  mutation: DocumentNode,
  baseOptions: MutationHookOptions<D, V> = {},
  inputs: ReadonlyArray<any> = []
) {
  const client = useClient()
  return React.useCallback(
    (localOptions: MutationHookOptions<D, V>) =>
      client.mutate({ mutation, ...baseOptions, ...localOptions }),
    inputs
  )
}
