import { License } from '../config/types'

const regexes = Object.keys(License).map(license => new RegExp(license, 'iu'))

const isValidLicense = (license: string) =>
  regexes.some(regex => regex.test(license))

export { isValidLicense }
