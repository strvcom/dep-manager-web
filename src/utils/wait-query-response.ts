import { DocumentNode } from 'graphql'

export default async function waitQueryResponse<Variables = {}> (
  query: DocumentNode,
  variables?: Variables
) {
  const { default: client } = await import('../config/apolloClient')
  return new Promise<void>((resolve, reject) => {
    const subscription = client
      .watchQuery<any, Variables>({
      query,
      variables,
      fetchPolicy: 'cache-only',
      fetchResults: false
    })
      .subscribe(({ data, errors }) => {
        if (errors) {
          subscription.unsubscribe()
          reject(errors)
        } else if (Object.keys(data).length > 0) {
          subscription.unsubscribe()
          resolve()
        }
      })
  })
}
