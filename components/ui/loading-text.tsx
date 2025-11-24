"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]

export function LoadingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[200px] ">
      <div className="relative flex items-center justify-center perspective-[1000px]">
        <AnimatePresence mode="wait">
          <Word key={words[index]} text={words[index]} />
        </AnimatePresence>
      </div>
    </div>
  )
}

function Word({ text }: { text: string }) {
  return (
    <motion.div
      className="flex gap-[0.1em] text-4xl md:text-6xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {text.split("").map((char, i) => (
        <Letter key={`${char}-${i}`} char={char} />
      ))}
    </motion.div>
  )
}

function Letter({ char }: { char: string }) {
  return (
    <motion.span
      style={{ transformStyle: "preserve-3d" }}
      variants={{
        initial: {
          rotateX: 90,
          y: 20,
          opacity: 0,
          filter: "blur(8px)",
        },
        animate: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.6,
            ease: [0.2, 0.65, 0.3, 0.9], // Elegant custom bezier for "tasteful" feel
          },
        },
        exit: {
          rotateX: -90,
          y: -20,
          opacity: 0,
          filter: "blur(8px)",
          transition: {
            duration: 0.4,
            ease: "easeIn",
          },
        },
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  )
}
