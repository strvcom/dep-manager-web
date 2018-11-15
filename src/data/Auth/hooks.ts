import { useQuery } from '../../utils/apollo-hooks'
import { AUTH_QUERY, AuthQueryResponse } from './queries'
import { useMemo } from 'react'

export function useAuth () {
  const result = useQuery<AuthQueryResponse>(AUTH_QUERY, { suspend: false })
  return useMemo(() => ({ ...result, data: result.data.auth }), [result])
}
