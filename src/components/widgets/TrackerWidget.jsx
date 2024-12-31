import React from 'react'
import { ProgressBar } from './ProgressBar'
import { useTracker } from '../../hooks/useTracker'

export function TrackerWidget({ id, name, icon, unit, goal }) {
  const { value, increment, decrement } = useTracker(id)
  const progress = Math.min((value / goal) * 100, 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>{icon}</span>
          <span>{name}</span>
        </h3>
        <span className="text-gray-600 dark:text-gray-300">
          {value} / {goal} {unit}
        </span>
      </div>
      
      <ProgressBar progress={progress} />
      
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          aria-label={`Decrease ${name}`}
        >
          -
        </button>
        <button
          onClick={increment}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          aria-label={`Increase ${name}`}
        >
          +
        </button>
      </div>
    </div>
  )
}