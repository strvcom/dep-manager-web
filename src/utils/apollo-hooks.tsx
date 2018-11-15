import React from 'react'
import { Omit } from 'utility-types'
import {
  MutationOptions,
  QueryOptions,
  ApolloClient,
  ApolloQueryResult,
  WatchQueryOptions,
  OperationVariables
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

export type QueryHookOptions < V > = Omit<QueryOptions<V>, 'query'> & {
  suspend?: boolean
}

export function useQuery<D = any, V = OperationVariables> (
  query: DocumentNode,
  { suspend = true, ...options }: QueryHookOptions<V> = {},
  inputs: ReadonlyArray<any> = []
) {
  const watchQueryOptions: WatchQueryOptions<V> = { query, ...options }
  const client = useClient()
  const watchQuery = React.useMemo(
    () => client.watchQuery<D, V>(watchQueryOptions),
    inputs
  )
  const currentResult = watchQuery.currentResult()
  const [result, setResult] = React.useState<ApolloQueryResult<D>>(
    currentResult as ApolloQueryResult<D>
  )
  if (
    currentResult.partial &&
    (suspend && options.fetchPolicy !== 'cache-only')
  ) {
    throw watchQuery.result()
  }
  React.useEffect(() => {
    const subscription = watchQuery.subscribe(next => {
      if (
        watchQuery.isDifferentFromLastResult(next) ||
        next.data !== result.data
      ) {
        setResult(next)
      }
    })
    return () => subscription.unsubscribe()
  }, inputs)
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
