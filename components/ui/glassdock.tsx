import React, { useState } from 'react';
import {
  Home,
  Terminal,
  Layout,
  Archive,
  History,
  Twitter,
  Github,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlassDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const links = [
    { title: 'Home', icon: Home },
    { title: 'Products', icon: Terminal },
    { title: 'Components', icon: Layout },
    { title: 'Archive', icon: Archive },
    { title: 'Changelog', icon: History },
    { title: 'Twitter', icon: Twitter },
    { title: 'Github', icon: Github },
  ];

  const handleMouseEnter = (index: number) => {
    if (hoveredIndex !== null && index !== hoveredIndex) {
      setDirection(index > hoveredIndex ? 1 : -1);
    }
    setHoveredIndex(index);
  };

  const getTooltipPosition = (index) => index * 52 + 12;

  return (
    <div className={`min-h-screen w-full font-sans ${isDarkMode ? 'dark' : ''}`}>
      
      <div className="fixed inset-0 -z-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-700" />

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-max">
        <div
          className="
            relative flex gap-4 items-center px-6 py-4 rounded-2xl
            bg-white dark:bg-neutral-800
            border border-neutral-200 dark:border-neutral-700
            shadow-lg dark:shadow-[0_4px_18px_rgba(0,0,0,0.4)]
          "
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -60,
                  x: getTooltipPosition(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="absolute top-0 left-0 pointer-events-none z-30"
              >
                <div
                  className="
                    px-5 py-2 rounded-lg
                    bg-neutral-900 text-white
                    dark:bg-white dark:text-black
                    shadow-md
                    flex items-center justify-center
                    border border-neutral-700 dark:border-neutral-300
                    min-w-[100px]
                  "
                >
                  <div className="relative h-[16px] flex items-center justify-center overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={links[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 35 : -35,
                          opacity: 0,
                          filter: 'blur(6px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -35 : 35,
                          opacity: 0,
                          filter: 'blur(6px)',
                        }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                        className="text-[13px] font-medium tracking-wide whitespace-nowrap"
                      >
                        {links[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {links.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Icon
                    size={22}
                    strokeWidth={2}
                    className={`transition-colors duration-200 ${
                      isHovered
                        ? 'text-neutral-900 dark:text-white'
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlassDock;