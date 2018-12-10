import { Department } from '../data/__generated-types'
import toUpper from 'ramda/es/toUpper'

const toDepartment = (str: string) => {
  if (typeof str !== 'string') throw new TypeError(`${str} is not a string`)
  const upperCased = toUpper(str)
  switch (upperCased) {
    case Department.ANDROID:
      return Department.ANDROID
    case Department.BACKEND:
      return Department.BACKEND
    case Department.FRONTEND:
      return Department.FRONTEND
    case Department.IOS:
      return Department.IOS
    default:
      throw new TypeError(`string ${str} not valid for conversion`)
  }
}

export default toDepartment
