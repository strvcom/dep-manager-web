import { ChangeTokenVariables, ChangeToken } from '../types'
import { ResolverFunction } from '../../utils/ResolverFunction'

const changeToken: ResolverFunction<ChangeTokenVariables> = (
  _,
  variables,
  { cache }
) => {
  cache.writeData<ChangeToken>({
    data: {
      auth: { __typename: 'Auth', token: variables.token }
    }
  })
  return null
}

export default {
  changeToken
}
