import { BidaDepartment } from '../data/__generated-types'
import { toUpper } from 'ramda'

const toBidaDepartment = (str: string) => {
  if (typeof str !== 'string') throw new TypeError(`${str} is not a string`)
  switch (toUpper(str)) {
    case BidaDepartment.ANDROID:
      return BidaDepartment.ANDROID
    case BidaDepartment.BACKEND:
      return BidaDepartment.BACKEND
    case BidaDepartment.FRONTEND:
      return BidaDepartment.FRONTEND
    case BidaDepartment.IOS:
      return BidaDepartment.IOS
    default:
      throw new TypeError(`string ${str} not valid for conversion`)
  }
}

export default toBidaDepartment
