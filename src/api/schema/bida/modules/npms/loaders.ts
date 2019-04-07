import fetch from 'isomorphic-fetch'
import DataLoader from 'dataloader'

/**
 * Analysis data loader for batched and performant requesting.
 */
const analysis = new DataLoader(async (names: string[]) => {
  const response = await fetch('https://api.npms.io/v2/package/mget', {
    method: 'POST',
    body: JSON.stringify(names),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) throw new Error(response.status.toString())

  const result = await response.json()

  // ensure result order.
  return names.map(name => result[name])
})

export { analysis }
