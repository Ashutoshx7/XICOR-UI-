"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div style={{ width: 40, height: 28 }} />

  const isDark = (theme === 'dark' || resolvedTheme === 'dark')

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex items-center h-8 w-14 rounded-full p-1 transition-colors',
        'bg-neutral-200 dark:bg-neutral-700',
        'border border-neutral-200 dark:border-neutral-700'
      )}
    >
      {/* knob */}
      <span
        className={cn(
          'h-6 w-6 bg-white dark:bg-black rounded-full shadow transform transition-transform',
          isDark ? 'translate-x-6' : 'translate-x-0'
        )}
      />

      {/* icons tucked under knob for visual hint */}
      <span className="absolute left-2 text-neutral-600 dark:text-neutral-300 pointer-events-none">
        {/* sun */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 4.75a.75.75 0 0 1 .75-.75h0a.75.75 0 0 1 0 1.5h0A.75.75 0 0 1 12 4.75zM12 19.25a.75.75 0 0 1-.75.75h0a.75.75 0 0 1 0-1.5h0A.75.75 0 0 1 12 19.25zM4.75 12a.75.75 0 0 1-.75-.75v0a.75.75 0 0 1 1.5 0v0A.75.75 0 0 1 4.75 12zM19.25 12a.75.75 0 0 1 .75.75v0a.75.75 0 0 1-1.5 0v0a.75.75 0 0 1 .75-.75zM6.22 6.22a.75.75 0 0 1 1.06 0 .75.75 0 0 1 0 1.06 .75.75 0 0 1-1.06-1.06zM16.72 16.72a.75.75 0 0 1 1.06 0 .75.75 0 0 1 0 1.06 .75.75 0 0 1-1.06-1.06zM6.22 17.78a.75.75 0 0 1 1.06 0 .75.75 0 0 1 0 1.06 .75.75 0 0 1-1.06-1.06zM16.72 7.28a.75.75 0 0 1 1.06 0 .75.75 0 0 1 0 1.06 .75.75 0 0 1-1.06-1.06zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
      </span>
      <span className="absolute right-2 text-neutral-600 dark:text-neutral-300 pointer-events-none">
        {/* moon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  )
}
