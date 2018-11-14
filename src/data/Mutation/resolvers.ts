import { ChangeTokenVariables } from '../Auth/mutations'
import { Auth } from '../Auth/types'
import { ResolverFunction } from '../../utils/ResolverFunction'

const changeToken: ResolverFunction<ChangeTokenVariables> = (
  _,
  variables,
  { cache }
) => {
  cache.writeData<{ auth: Auth }>({
    data: {
      auth: { __typename: 'Auth', token: variables.token }
    }
  })
  return null
}

export default {
  changeToken
}
