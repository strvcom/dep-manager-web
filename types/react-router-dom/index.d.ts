import { RouteComponentProps } from 'react-router-dom'
import {RouteChildrenProps} from 'react-router'
import H from 'history'
import {Requireable} from 'prop-types'

declare module 'react-router-dom' {
  export interface RoutePropTypes {
    location?: Requireable<H.Location>
    component?: Requireable<object | Function>
    render?: Requireable<((props: RouteComponentProps<{}>) => React.ReactNode)>
    children?: Requireable<((props: RouteChildrenProps<{}>) => React.ReactNode) | React.ReactNode>
    path?: Requireable<string | string[]>
    exact?: Requireable<boolean>
    sensitive?: Requireable<boolean>
    strict?: Requireable<boolean>
  }
  namespace Route {
    export const propTypes: RoutePropTypes
  }
}
