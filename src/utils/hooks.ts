import { useState, useEffect, useCallback } from 'react'
import client from '../config/apolloClient'
import {
  MutationOptions,
  WatchQueryOptions,
  ApolloQueryResult,
  NetworkStatus
} from 'apollo-client'
import { MutationFn } from 'react-apollo'

export function useMutation<T, TVariables = any> (
  options: MutationOptions<T, TVariables>,
  inputs: ReadonlyArray<any> = []
): MutationFn<T, TVariables> {
  const mutate = useCallback<MutationFn<T, TVariables>>(
    o => client.mutate<T, TVariables>({ ...options, ...o }),
    inputs
  )
  return mutate
}

export function useQuery<T, TVariables = any> (
  options: WatchQueryOptions<TVariables> & { cached?: boolean },
  inputs: ReadonlyArray<any> = []
): ApolloQueryResult<T | null> {
  const [state, setState] = useState<ApolloQueryResult<T | null>>({
    stale: false,
    networkStatus: NetworkStatus.ready,
    loading: true,
    data: options.cached ? client.readQuery<T>(options) : null
  })
  useEffect(() => {
    const subscription = client.watchQuery<T>(options).subscribe(setState)
    return subscription.unsubscribe
  }, inputs)
  return state
}
