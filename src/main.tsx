import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css'

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  // Create root once
  const root = ReactDOM.createRoot(rootElement)

  // Render app with StrictMode
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})