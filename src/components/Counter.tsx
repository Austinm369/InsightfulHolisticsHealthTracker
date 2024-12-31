import React, { useState } from 'react'
import { Button } from './Button'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <p className="text-lg text-gray-700 mb-4">
        Count is: <span className="font-bold">{count}</span>
      </p>
      <div className="flex gap-4">
        <Button onClick={() => setCount(count + 1)}>
          Increment
        </Button>
        <Button onClick={() => setCount(count - 1)}>
          Decrement
        </Button>
      </div>
    </div>
  )
}