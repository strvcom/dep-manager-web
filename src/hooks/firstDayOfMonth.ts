import React from 'react'

export default function useFirstDayOfMonth () {
  const now = new Date()
  return React.useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [
    now.getFullYear(),
    now.getMonth()
  ])
}
