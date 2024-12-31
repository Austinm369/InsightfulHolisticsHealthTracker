import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '🌙' : '🌞'}
    </button>
  )
}