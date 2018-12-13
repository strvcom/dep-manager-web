import { useQuery, useMutation } from '../../utils/apollo-hooks'
import { AUTH_QUERY, CHANGE_TOKEN } from './queries'
import { useCallback } from 'react'
import Netlify from 'netlify-auth-providers'
import { AuthQuery } from './__generated-types/AuthQuery'
import {
  ChangeToken,
  ChangeTokenVariables
} from './__generated-types/ChangeToken'
import { REACT_APP_SITE_ID } from '../../config/env'

const options =
  process.env.NODE_ENV === 'development' ? { site_id: REACT_APP_SITE_ID } : {}

const authenticator = new Netlify(options)

interface NetlifyResponse {
  token: string
  scope: string
}

export function useAuth () {
  const result = useQuery<AuthQuery>(AUTH_QUERY)
  return result.data.auth
}

export function useAuthenticator () {
  const changeAuth = useMutation<ChangeToken, ChangeTokenVariables>(
    CHANGE_TOKEN
  )
  return useCallback(
    () =>
      authenticator.authenticate(
        { provider: 'github', scope: 'read:user,read:org,repo' },
        (err, data: NetlifyResponse) => {
          if (err) return alert(`LOGIN ERROR: ${err}`)
          changeAuth({ variables: { token: data.token } })
        }
      ),
    [changeAuth]
  )
}
