'use client'

import { useEffect, type ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

function ThemeBootstrap({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    document.documentElement.classList.toggle('light', storedTheme === 'light')
    window.localStorage.setItem('theme', storedTheme)
  }, [])

  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeBootstrap>
      {children}
      <Toaster />
    </ThemeBootstrap>
  )
}