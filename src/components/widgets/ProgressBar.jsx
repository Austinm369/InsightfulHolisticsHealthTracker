import React from 'react'

export function ProgressBar({ progress }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}