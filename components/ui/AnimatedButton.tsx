'use client'

import React from 'react'
import { motion } from "framer-motion"

const AnimatedButton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <motion.button 
        className="px-6 py-2 rounded-md relative overflow-hidden bg-black border border-neutral-800"
        whileTap={{ scale: 0.97 }}
        transition={{
          stiffness:20,
          damping:15,
          mass:2,
          scale: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          }
        }}
      >
        {/* Text with shine mask */}
        <motion.span 
          className="text-neutral-100 tracking-wide font-light h-full w-full block relative z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
            maskImage: 'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
          }}
          initial={{ '--mask-x': '100%' } as any}
          animate={{ '--mask-x': '-100%' } as any}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            repeatDelay: 1
          }}
        >
          Browse Components
        </motion.span>
        
        {/* Border shine effect */}
        <motion.span
          className="block absolute inset-0 rounded-md p-[1px]"
          style={{
            background: 'linear-gradient(-75deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
          initial={{ backgroundPosition: '100% 0', opacity: 0 }}
          animate={{
            backgroundPosition: ['100% 0', '0% 0'],
            opacity: [0, 1, 0] // fade in and fade out
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
      </motion.button>
    </div>
  )
}

export default AnimatedButton
