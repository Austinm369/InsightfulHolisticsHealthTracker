import React from 'react'
import { ThemeToggle } from '../theme/ThemeToggle'
import { SettingsButton } from '../settings/SettingsButton'

export function HeaderControls() {
  return (
    <div className="absolute right-4 top-0 flex gap-4">
      <ThemeToggle />
      <SettingsButton />
    </div>
  )
}