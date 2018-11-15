import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

if (process.env.NODE_ENV === 'development') {
  // fixes react-route erroneous prop-types
  ;(Route as any).propTypes.component = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}
