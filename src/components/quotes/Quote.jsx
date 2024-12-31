import React from 'react'

export function Quote({ text, author }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-2">"{text}"</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">- {author}</p>
    </div>
  )
}