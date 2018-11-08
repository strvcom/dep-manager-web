import * as React from 'react'

declare module 'react' {
  type MemoHOC = <P>(
    component: React.StatelessComponent<P>,
    shouldComponentUpdate?:(
      prevProps: Readonly<P>,
      nextProps: Readonly<P>,
      nextContext: any
    ) => boolean
  ) => React.ComponentClass<P>
  type LazyHOC = <P>(
    importFn: () => Promise<{default: React.ComponentType<P>}>
  ) => React.ComponentClass<P>
  export const lazy: LazyHOC
  export const memo: MemoHOC
  type SuspenseProps = {
    fallback: React.ReactNode
    children: React.ReactNode
  }
  export const Suspense: React.ComponentClass<SuspenseProps>
}
