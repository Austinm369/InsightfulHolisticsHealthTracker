import React from 'react'

interface QuoteProps {
  text: string
  author: string
}

export function Quote({ text, author }: QuoteProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-lg text-gray-700 italic">"{text}"</p>
      <p className="text-sm text-gray-500 mt-2">- {author}</p>
    </div>
  )
}