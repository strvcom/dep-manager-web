import React from 'react'
import deepEqual from 'deep-equal'

export interface PromiseHookData<T = any> {
  pending: boolean
  result?: T
  error?: Error
}

export default function usePromise<T = any> (
  fn: () => Promise<T>,
  input: ReadonlyArray<any> = []
) {
  const [state, setState] = React.useState<PromiseHookData<T>>({
    pending: true,
    result: undefined,
    error: undefined
  })
  const previousInput = React.useRef(input)
  React.useEffect(() => {
    fn()
      .then(result => setState({ pending: false, result }))
      .catch(result => setState({ pending: false, result }))
  }, input)
  if (!deepEqual(previousInput.current, input)) {
    previousInput.current = input
    return { pending: true, result: undefined, error: undefined }
  }
  return state
}
