import React from 'react';
import { motion } from 'framer-motion';

// The complex gradient string from the original CSS
const PLANET_GRADIENT = `radial-gradient(
  at 50% 50% in oklch,
  color-mix(in oklch, skyblue, blue 80%),
  color-mix(in oklch, skyblue, blue 10%) 19%,
  color-mix(in oklch, skyblue, blue 20%) 20%,
  color-mix(in oklch, skyblue, blue 80%),
  color-mix(in oklch, blue, black 50%) 55%,
  transparent 70%
)`;

export default function App() {
  return (
    // Added 'isolate' to ensure stacking context is clear
    <div className=" w-full h-full overflow-hidden relative isolate">
      <Planet />
    </div>
  );
}

function Planet() {
  return (
    <motion.div
      // FIXED:
      // 1. Changed z-[-1] to z-0 so it is visible on top of the black background
      // 2. Fixed md:top-[1500px] typo -> md:top-1/2 to center it vertically
      className="fixed left-full -translate-x-200 -translate-y-80 z-0 pointer-events-none aspect-square w-[100px] top-[10%] md:w-[1500px] md:top-1/2"
      
      style={{ backgroundImage: PLANET_GRADIENT }}

      initial={{ 
        opacity: 0.8, 
        scale: 1 
      }}
      animate={{ 
        opacity: [0.2, 2, 0.8], 
        scale: [1, 1.2, 1] 
      }}
      transition={{
        duration: 8,
        ease: "linear",
    
        
      }}
    />
  );
}