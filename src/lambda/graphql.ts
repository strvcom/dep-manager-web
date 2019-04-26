import { ApolloServer } from 'apollo-server-lambda'
import { schema } from '../api/schema'

const { ENGINE_API_KEY } = process.env

interface ILambdaEvent {
  headers: {
    [header: string]: string
  }
}

interface ILambdaContext {
  functionName: string
}

interface ILambdaArguments {
  event: ILambdaEvent
  context: ILambdaContext
}

const server = new ApolloServer({
  schema,
  introspection: true,
  // eslint-disable-next-line no-shadow
  context: ({ event, context }: ILambdaArguments) => ({
    headers: event.headers,
    functionName: context.functionName,
    aws: { event, context },
  }),
  // optional
  engine: ENGINE_API_KEY ? { apiKey: ENGINE_API_KEY } : false,
})

const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
})

export { handler }
