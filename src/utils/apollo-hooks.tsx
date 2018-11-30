import React from 'react'
import { Omit } from 'utility-types'
import {
  MutationOptions,
  QueryOptions,
  ApolloClient,
  WatchQueryOptions,
  OperationVariables,
  ApolloQueryResult
} from 'apollo-client'
import { DocumentNode } from 'graphql'

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

export function useQuery<D = any, V = OperationVariables> (
  query: DocumentNode,
  options: QueryHookOptions<V> = {},
  inputs: ReadonlyArray<any> = []
) {
  const watchQueryOptions: WatchQueryOptions<V> = { query, ...options }
  const client = useClient()
  const watchQuery = React.useMemo(
    () => client.watchQuery<D, V>(watchQueryOptions),
    inputs
  )
  const initialResult = React.useMemo(
    () => watchQuery.currentResult() as ApolloQueryResult<D>,
    [watchQuery]
  )
  const [result, setResult] = React.useState(initialResult)
  const [error, setError] = React.useState<Error>(undefined!)
  React.useEffect(() => {
    const subscription = watchQuery.subscribe({
      next (nextResult) {
        if (
          watchQuery.isDifferentFromLastResult(nextResult) ||
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
