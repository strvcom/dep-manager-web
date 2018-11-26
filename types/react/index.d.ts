import * as React from 'react'
declare module 'react' {
  export = React
  export as namespace React
  declare namespace React {
    const Suspense: ExoticComponent<{
    children?: ReactNode

    /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
    fallback: NonNullable<ReactNode> | null

    // I tried looking at the code but I have no idea what it does.
    // https://github.com/facebook/react/issues/13206#issuecomment-432489986
    /**
       * Not implemented yet, requires unstable_ConcurrentMode
       */
    maxDuration?: number
    }>
  }
}
