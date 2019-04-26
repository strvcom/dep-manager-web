import { BidaDepartment } from '../config/types'

const toBidaDepartment = (str: string): BidaDepartment => {
  const department = str.toUpperCase()

  if (!BidaDepartment[department]) {
    throw new TypeError(`"${str}" is not a know department`)
  }

  return BidaDepartment[department]
}

export default toBidaDepartment
