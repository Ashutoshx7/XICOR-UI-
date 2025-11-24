"use client"

import { motion } from "framer-motion"

export default function SpotlightText() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black antialiased">
      {/* Main Spotlight Beam - Center - Most Prominent */}
      <motion.div
        className="absolute left-0 right-0 top-0 mx-auto h-[120vh] w-full max-w-3xl"
        style={{
          transformOrigin: "50% 0",
          background:
            "conic-gradient(from 0deg at 50% -10%, transparent 40%, rgba(147,197,253,0.15) 48%, rgba(147,197,253,0.3) 50%, rgba(147,197,253,0.15) 52%, transparent 60%)",
          filter: "blur(40px)",
        }}
        initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0.9, 1],
          rotate: [0, 3, -3, 0],
          scale: [0.8, 1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 2.5, ease: "easeOut" },
          rotate: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatType: "mirror" },
          scale: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatType: "mirror" },
        }}
      />

      {/* Secondary Spotlight - Left Side */}
      <motion.div
        className="absolute left-0 right-0 top-0 mx-auto h-[100vh] w-full max-w-2xl"
        style={{
          transformOrigin: "50% 0",
          background:
            "conic-gradient(from 0deg at 50% -10%, transparent 42%, rgba(124,145,182,0.12) 48%, rgba(124,145,182,0.22) 50%, rgba(124,145,182,0.12) 52%, transparent 58%)",
          filter: "blur(35px)",
        }}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{
          opacity: [0, 0.9, 0.7, 0.9],
          rotate: [-20, -15, -25, -20],
        }}
        transition={{
          opacity: { duration: 2.8, delay: 0.3, ease: "easeOut" },
          rotate: {
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "mirror",
            delay: 0.5,
          },
        }}
      />

      {/* Secondary Spotlight - Right Side */}
      <motion.div
        className="absolute left-0 right-0 top-0 mx-auto h-[100vh] w-full max-w-2xl"
        style={{
          transformOrigin: "50% 0",
          background:
            "conic-gradient(from 0deg at 50% -10%, transparent 42%, rgba(120,119,198,0.12) 48%, rgba(120,119,198,0.22) 50%, rgba(120,119,198,0.12) 52%, transparent 58%)",
          filter: "blur(35px)",
        }}
        initial={{ opacity: 0, rotate: 20 }}
        animate={{
          opacity: [0, 0.9, 0.7, 0.9],
          rotate: [20, 25, 15, 20],
        }}
        transition={{
          opacity: { duration: 2.8, delay: 0.6, ease: "easeOut" },
          rotate: {
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "mirror",
            delay: 1,
          },
        }}
      />

      {/* Ambient Fill Light */}
      <motion.div
        className="absolute left-0 right-0 top-0 mx-auto h-[80vh] w-full max-w-4xl rounded-full"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.4, 0.6] }}
        transition={{
          duration: 3,
          delay: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[140vh] w-full max-w-4xl"
        style={{
          transformOrigin: "100% 100%",
          background:
            "conic-gradient(from 225deg at 100% 100%, transparent 35%, rgba(147,197,253,0.018) 47%, rgba(167,217,255,0.035) 49.5%, rgba(147,197,253,0.018) 52%, transparent 65%)",
          filter: "blur(80px)",
        }}
        initial={{ opacity: 0, rotate: 0, scale: 0.7 }}
        animate={{
          opacity: [0, 0.6, 0.8, 0.6],
          rotate: [0, -8, 8, 0],
          scale: [0.7, 1, 0.95, 1],
        }}
        transition={{
          opacity: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatType: "mirror" },
          scale: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatType: "mirror" },
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[120vh] w-full max-w-3xl"
        style={{
          transformOrigin: "100% 100%",
          background:
            "conic-gradient(from 225deg at 100% 100%, transparent 38%, rgba(120,119,198,0.015) 47%, rgba(139,139,220,0.028) 49.5%, rgba(120,119,198,0.015) 52%, transparent 62%)",
          filter: "blur(90px)",
        }}
        initial={{ opacity: 0, rotate: 15 }}
        animate={{
          opacity: [0, 0.5, 0.7, 0.5],
          rotate: [15, 25, 5, 15],
        }}
        transition={{
          opacity: { duration: 4, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
          rotate: {
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "mirror",
            delay: 0.5,
          },
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[60vh] w-full max-w-2xl rounded-full"
        style={{
          background: "radial-gradient(ellipse at 100% 100%, rgba(99,102,241,0.025) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.6, 0.4] }}
        transition={{
          duration: 4.5,
          delay: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />
    </div>
  )
}
