"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SmokeTextProps extends React.HTMLAttributes<HTMLDivElement> {
    texts: string[];
    duration?: number;
    interval?: number;
}

export const SmokeText = ({
    texts,
    className,
    duration = 1, // Animation duration per character
    interval = 4000, // Total time text stays visible before switching
    ...props
}: SmokeTextProps) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return (
        <div
            className={cn(
                "relative flex items-center justify-center",
                className
            )}
            {...props}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className="flex flex-wrap justify-center gap-[0.15em]"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {texts[index].split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block font-medium tracking-wide text-zinc-900 dark:text-zinc-100 text-3xl md:text-4xl"
                            variants={{
                                initial: {
                                    filter: "blur(10px)",
                                    opacity: 0,
                                    y: 10, // Slight drop start
                                    x: 0,
                                },
                                animate: {
                                    filter: "blur(0px)",
                                    opacity: 1,
                                    y: 0,
                                    x: 0,
                                    transition: {
                                        duration: duration,
                                        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for "subtle" feel
                                        delay: i * 0.05, // Gentle stagger
                                    }
                                },
                                exit: {
                                    filter: "blur(10px)",
                                    opacity: 0,
                                    y: -20, // Drift up like smoke
                                    x: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                        delay: i * 0.03, // Faster exit stagger
                                    }
                                }
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
