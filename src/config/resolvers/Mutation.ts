import { ResolverFunction } from '../../utils/ResolverFunction'
import { ChangeTokenVariables } from '../../data/Auth/__generated-types/ChangeToken'
import { AuthQuery } from '../../data/Auth/__generated-types/AuthQuery'

const changeToken: ResolverFunction<ChangeTokenVariables> = (
  _,
  variables,
  { cache }
) => {
  cache.writeData<AuthQuery>({
    data: {
      auth: { __typename: 'Authentication', token: variables.token }
    }
  })
  return null
}

export default {
  changeToken
}
