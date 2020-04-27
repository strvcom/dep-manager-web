// import { get } from 'lodash'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { authorize } from '../app'

const link = setContext((_request, context) => authorize(context)) as ApolloLink

export { link }
