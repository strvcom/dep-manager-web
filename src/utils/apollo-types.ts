import { ApolloLink, RequestHandler, Operation, NextLink } from 'apollo-link'
import { ReturnType } from 'utility-types'

type NonTerminalRequestHandler = (
  operation: Operation,
  forward: NextLink
) => ReturnType<RequestHandler>

export class ApolloNonTerminalLink extends ApolloLink {
  public constructor(handler: NonTerminalRequestHandler) {
    super((operation, forward) => {
      if (!forward) {
        throw new Error('This Link cannot be terminal!')
      }

      return handler.call(this, operation, forward)
    })
  }
}
