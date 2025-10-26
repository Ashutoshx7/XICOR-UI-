"use client"

import React from 'react'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" will toggle the `class` on the <html> element (preferred for Tailwind)
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
