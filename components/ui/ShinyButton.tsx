"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ShinyButton() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle")

  const handleClick = () => {
    setState("loading")
    setTimeout(() => {
      setState("success")
      setTimeout(() => setState("idle"), 1000)
    }, 2800)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "relative px-10 py-4 rounded-full overflow-hidden select-none",
        "bg-gradient-to-b from-[#2a2a2a] to-[#161616]",
        "border border-white/10 text-white",
        "shadow-[0_4px_15px_-6px_rgba(0,0,0,0.6)]",
        "backdrop-blur-md transition-all duration-300"
      )}
      whileTap={{ scale: 0.97 }}
    >
      {/* 🌈 BORDER GRADIENT BEAM — visible only during LOADING */}
      <AnimatePresence>
        {state === "loading" && (
          <>
            {/* Animated Top Border Line */}
            <motion.div
              key="top-line"
              className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Animated Bottom Border Line */}
            <motion.div
              key="bottom-line"
              className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Animated Left Border Line */}
            <motion.div
              key="left-line"
              className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/80 to-transparent"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "-100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Animated Right Border Line */}
            <motion.div
              key="right-line"
              className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/80 to-transparent"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ✨ HOVER GLARE (subtle sweep on hover) */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-full"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          initial={{ x: "-110%", opacity: 0 }}
          whileHover={{ x: "110%", opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(120deg, transparent 15%, rgba(255,255,255,0.22), transparent 85%)",
          }}
        />
      </motion.div>

      {/* Metallic soft edge (always visible) */}
      <div className="absolute inset-0 rounded-full pointer-events-none 
        bg-[linear-gradient(to_bottom,
          rgba(255,255,255,0.35),
          rgba(255,255,255,0)_35%,
          rgba(255,255,255,0)_65%,
          rgba(255,255,255,0.3)_100%
        )]
      " />

      {/* Success Flash */}
      <AnimatePresence>
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-500 rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Loading Dots */}
      <AnimatePresence>
        {state === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LoadingDots />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Text */}
      <motion.span
        className="relative z-10"
        animate={{ opacity: state === "loading" ? 0 : 1 }}
      >
        Shiny Button
      </motion.span>
    </motion.button>
  )
}

function LoadingDots() {
  return (
    <div className="flex gap-1 text-white">
      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
    </div>
  )
}
