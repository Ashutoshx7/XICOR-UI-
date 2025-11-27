"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

interface DropItem {
  id: string
  text: string
  x: string // e.g. "1.55em"
  y: string // e.g. "3.73em"
  rotation?: number
}

interface LiquidDropsProps {
  items: DropItem[]
  className?: string
  textColor?: string
  liquidColor?: string
}

export function LiquidDrops({
  items,
  className = "",
  textColor = "#f6f1e6",
  liquidColor = "#231d1c",
}: LiquidDropsProps) {
  // Generate random stable values for the liquid effect (blobs)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // We need a flat list of all letters to coordinate the staggering across all words if we want a global sequence,
  // or we can just calculate delay based on total index.
  // The original script calculates delay based on global index of letters.

  const globalLetterCount = 0

  const processedItems = useMemo(() => {
    let count = 0
    return items.map((item) => {
      const letters = item.text.split("").map((char, charIndex) => {
        const currentGlobalIndex = count
        count++

        // Random blob shape for the liquid layer
        // Simulating: box-shadow: #{randomNum(-0.03, 0.03)}em #{randomNum(-0.03, 0.03)}em 0 #{randomNum(0.2, 0.4)}em currentColor
        const r1 = (Math.random() * 0.06 - 0.03).toFixed(3)
        const r2 = (Math.random() * 0.06 - 0.03).toFixed(3)
        const r3 = (Math.random() * 0.2 + 0.2).toFixed(3)
        const blobShadow = `${r1}em ${r2}em 0 ${r3}em currentColor`

        return {
          char,
          index: currentGlobalIndex,
          blobShadow,
        }
      })

      // Random rotation for the word if not provided
      const rotation = item.rotation ?? Math.random() * 6 - 3 // -3 to 3 deg

      return { ...item, letters, rotation }
    })
  }, [items])

  if (!isMounted) return null

  return (
    <div className={`relative w-full h-full ${className} `}>
      {/* SVG Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="drops-filter" x="-50%" width="200%" y="-50%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="cm" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: The Liquid "Goo" Background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        style={{ filter: "url(#drops-filter)" }}
      >
        {processedItems.map((item) => (
          <div
            key={`liquid-${item.id}`}
            className="absolute top-1/2 left-1/2 flex"
            style={{
              transform: `translate(calc(-50% - ${item.x}), calc(-50% - ${item.y})) rotate(${item.rotation}deg)`,
              color: liquidColor,
              fontSize: "6vmin",
            }}
          >
            {item.letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block rounded-full bg-current"
                style={{
                  padding: "0.1em 0.2em",
                  margin: "-0.1em -0.2em",
                  boxShadow: letter.blobShadow,
                }}
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.42, 0, 0.58, 1], // ease-in-out approximation or custom cubic-bezier
                  delay: letter.index * 0.095, // 95ms delay
                }}
              >
                {letter.char === " " ? "\u00A0" : letter.char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      {/* Layer 2: The Readable Text Foreground */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {processedItems.map((item) => (
          <div
            key={`text-${item.id}`}
            className="absolute top-1/2 left-1/2 flex whitespace-pre"
            style={{
              transform: `translate(calc(-50% - ${item.x}), calc(-50% - ${item.y})) rotate(${item.rotation}deg)`,
              color: textColor,
              fontSize: "6vmin",
              fontFamily: "Georgia, serif",
            }}
          >
            {item.letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={{
                  padding: "0.1em 0.2em",
                  margin: "-0.1em -0.2em",
                }}
                initial={{ y: "100vh" }}
                animate={{ y: ["100vh", "-0.15em", "0em"] }} // Drop -> Bounce Up -> Settle
                transition={{
                  duration: 0.8,
                  times: [0, 0.85, 1], // Keyframe percentages matching original CSS
                  ease: "easeOut",
                  delay: letter.index * 0.095,
                }}
              >
                {letter.char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
