import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './client'

const GraphQLProvider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export { GraphQLProvider }
