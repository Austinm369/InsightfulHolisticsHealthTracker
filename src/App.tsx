import React from 'react'
import { HealthTrackers } from './components/HealthTrackers'
import { QuoteList } from './components/quotes/QuoteList'
import { ThemeProvider } from './contexts/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <QuoteList />
          <HealthTrackers />
        </div>
      </div>
    </ThemeProvider>
  )
}