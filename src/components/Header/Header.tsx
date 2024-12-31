import React from 'react'
import { HeaderTitle } from './HeaderTitle'
import { HeaderControls } from './HeaderControls'

export function Header() {
  return (
    <header className="relative mb-8 pt-12 text-center">
      <HeaderControls />
      <HeaderTitle />
    </header>
  )
}