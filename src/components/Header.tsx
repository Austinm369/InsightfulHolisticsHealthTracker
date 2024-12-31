import React from 'react'
import { ThemeToggle } from './theme/ThemeToggle'
import { SettingsButton } from './settings/SettingsButton'

export function Header() {
  return (
    <header className="relative mb-8 pt-12 text-center">
      <div className="absolute right-4 top-0 flex gap-4">
        <ThemeToggle />
        <SettingsButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Health Tracker
      </h1>
    </header>
  )
}