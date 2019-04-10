import { License } from '../../config/types'

const licenses = Object.keys(License)

export function isValidLicense (license: string) {
  for (const currentLicense of licenses) {
    if (license.includes(currentLicense)) return true
  }
  return false
}
