import { useState, useCallback } from 'react'

export function useTracker(id) {
  const [value, setValue] = useState(0)

  const increment = useCallback(() => {
    setValue(prev => prev + (id === 'steps' ? 500 : 1))
  }, [id])

  const decrement = useCallback(() => {
    setValue(prev => Math.max(0, prev - (id === 'steps' ? 500 : 1)))
  }, [id])

  return { value, increment, decrement }
}