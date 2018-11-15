import ReactDOM from 'react-dom'

declare module 'react-dom' {
  export function createRoot(
    root: HTMLElement
  ): {
    render: (element: React.ReactElement, callback?: () => void) => void
  }
}
