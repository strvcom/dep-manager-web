import { useQuery } from '~api/client'
import document from './query.gql'

const useCurrentUser = () => useQuery('CURRENT_USER_QUERY', document)

export { useCurrentUser }
