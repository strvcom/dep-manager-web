import {
  useQuery as apolloUseQuery,
  useMutation as apolloUseMutation,
  DocumentNode,
  QueryHookOptions,
  MutationHookOptions,
} from '@apollo/client'

import { OperationMap } from '~generated/types'
import { useAuthenticationToken } from '~app/config/auth'
import { useEffect } from 'react'

type Queries = OperationMap['query']
type Mutations = OperationMap['mutation']

/**
 * This is a enhanced version of Apollo's useQuery with the following purposes:
 *
 * 1 - Less verbose typing, with operation `_name` argument;
 *
 *    from:
 *      ```
 *      import { TYPE_FOR_OPERATION_DATA, TYPE_FOR_OPERATION_VARIABLE } from 'somewhere'
 *      import { useQuery } from '@apollo/client'
 *
 *      const result = useQuery<TYPE_FOR_OPERATION_DATA, TYPE_FOR_OPERATION_VARIABLES>(query, options)
 *      ```
 *
 *    to:
 *      ```
 *      import { useQuery } from '~api/client'
 *
 *      const result = useQuery('OPERATION_NAME', query, options)
 *      ```
 *
 * 2 - Automatic authorization token based refetch.
 *    When authenticating (or logging off) most queries should update. We could
 *    be more intelligent then that, but this is good enough for current stage
 *    of the application.
 */
const useQuery = <
  OperationName extends keyof Queries,
  Types extends Queries[OperationName] = Queries[OperationName]
>(
  _name: OperationName,
  doc: DocumentNode,
  options?: QueryHookOptions<Types['data'], Types['variables']>
) => {
  const [token] = useAuthenticationToken()
  const result = apolloUseQuery<Types['data'], Types['variables']>(doc, options)

  // refresh store when switching auth state.
  useEffect(() => {
    result.refetch()
  }, [token])

  return result
}

/**
 * This is a enhanced version of Apollo's useMutation with the following purposes:
 *
 * 1 - Less verbose typing, with operation `_name` argument;
 *
 *    from:
 *      ```
 *      import { TYPE_FOR_OPERATION_DATA, TYPE_FOR_OPERATION_VARIABLE } from 'somewhere'
 *      import { useMutation } from '@apollo/client'
 *
 *      const result = useMutation<TYPE_FOR_OPERATION_DATA, TYPE_FOR_OPERATION_VARIABLES>(mutation, options)
 *      ```
 *
 *    to:
 *      ```
 *      import { useMutation } from '~api/client'
 *
 *      const result = useMutation('OPERATION_NAME', mutation, options)
 *      ```
 */
const useMutation = <
  OperationName extends keyof Mutations,
  Types extends Mutations[OperationName] = Mutations[OperationName]
>(
  _name: OperationName,
  doc: DocumentNode,
  options?: MutationHookOptions<Types['data'], Types['variables']>
) => apolloUseMutation<Types['data'], Types['variables']>(doc, options)

export { useQuery, useMutation }
