import playground from 'graphql-playground-middleware-lambda'

const headers: { [key: string]: string } = {}

if (process.env.GITHUB_OAUTH_TOKEN) {
  headers.authorization = `bearer ${process.env.GITHUB_OAUTH_TOKEN}`
}

const handler = playground({ endpoint: '/graphql', headers })

export { handler }
