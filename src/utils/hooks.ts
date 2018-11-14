import { useState, useEffect, useCallback } from 'react'
import client from '../config/apolloClient'
import {
  MutationOptions,
  WatchQueryOptions,
  ApolloQueryResult,
  NetworkStatus
} from 'apollo-client'
import { MutationFn } from 'react-apollo'

export const useMutation = <T, TVariables = any>(
  options: MutationOptions<T, TVariables>,
  inputs: ReadonlyArray<any> = []
): MutationFn<T, TVariables> =>
  useCallback<MutationFn<T, TVariables>>(
    o => client.mutate<T, TVariables>({ ...options, ...o }),
    inputs
  )

export const useQuery = <T, TVariables = any>(
  options: WatchQueryOptions<TVariables>,
  inputs: ReadonlyArray<any> = []
): ApolloQueryResult<T | null> => {
  const [state, setState] = useState<ApolloQueryResult<T | null>>({
    stale: false,
    networkStatus: NetworkStatus.ready,
    loading:
      !(options.fetchPolicy && options.fetchPolicy === 'cache-only'),
    data:
      options.fetchPolicy && options.fetchPolicy === 'cache-only'
        ? client.readQuery<T>(options)
        : null
  })
  useEffect(() => {
    const subscription = client.watchQuery<T>(options).subscribe(setState)
    return () => subscription.unsubscribe()
  }, inputs)
  return state
}
