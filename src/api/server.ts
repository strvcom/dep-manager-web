import { APIGatewayEvent, Context as AWSContext } from 'aws-lambda'
import { ApolloServer } from 'apollo-server-lambda'
import { schema } from './schema'
import { SchemaContext } from './context'

const { ENGINE_API_KEY } = process.env

interface ContextArguments {
  event: APIGatewayEvent
  context: AWSContext
}

const server = new ApolloServer({
  schema,
  introspection: true,
  context: ({ event, context }: ContextArguments): SchemaContext => ({
    aws: { event, context },
  }),
  // optional
  engine: ENGINE_API_KEY ? { apiKey: ENGINE_API_KEY } : false,
})

export { server }
