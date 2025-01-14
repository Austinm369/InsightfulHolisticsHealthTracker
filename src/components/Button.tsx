import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  )
}