import React from 'react'
import { Quote } from './Quote'

const QUOTES = [
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" }
]

export function QuoteList() {
  return (
    <div className="space-y-4 mb-8">
      {QUOTES.map((quote, index) => (
        <Quote key={index} {...quote} />
      ))}
    </div>
  )
}