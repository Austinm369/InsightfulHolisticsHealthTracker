/**
 * Core Application Component
 */
import React from 'react'
import { Header } from '../components/Header'
import { HealthTrackers } from '../components/HealthTrackers'
import { QuoteList } from '../components/quotes/QuoteList'
import { ThemeProvider } from '../contexts/ThemeContext'
import { MenuBar } from '../components/menu/MenuBar'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <MenuBar />
        <div className="container mx-auto px-4 py-8 pt-16">
          <Header />
          <QuoteList />
          <HealthTrackers />
        </div>
      </div>
    </ThemeProvider>
  )
}