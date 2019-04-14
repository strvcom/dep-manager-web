import { ApolloServer } from 'apollo-server-lambda'
import { schema } from '../api/schema'

const server = new ApolloServer({
  schema,
  introspection: true,
  context: ({ event, context }: any) => ({
    headers: event.headers,
    functionName: context.functionName,
    aws: { event, context }
  }),
  // optional
  engine: { apiKey: process.env.ENGINE_API_KEY }
})

const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }
})

export { handler }
