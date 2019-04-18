module.exports = {
  client: {
    includes: ['src/**/*.gql'],
    excludes: ['src/api/**/*'],
    service: {
      name: 'bida-schema',
      localSchemaFile: './generated/schema.graphql'
    }
  }
}
