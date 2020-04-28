import {
  useQuery as apolloUseQuery,
  useMutation as apolloUseMutation,
  DocumentNode,
  QueryHookOptions,
  MutationHookOptions,
} from '@apollo/client'

import { OperationMap } from '~generated/types'

type Queries = OperationMap['query']
type Mutations = OperationMap['mutation']

const useQuery = <
  OperationName extends keyof Queries,
  Types extends Queries[OperationName] = Queries[OperationName]
>(
  _name: OperationName,
  doc: DocumentNode,
  options?: QueryHookOptions<Types['data'], Types['variables']>
) => apolloUseQuery<Types['data'], Types['variables']>(doc, options)

const useMutation = <
  OperationName extends keyof Mutations,
  Types extends Mutations[OperationName] = Mutations[OperationName]
>(
  _name: OperationName,
  doc: DocumentNode,
  options?: MutationHookOptions<Types['data'], Types['variables']>
) => apolloUseMutation<Types['data'], Types['variables']>(doc, options)

export { useQuery, useMutation }
