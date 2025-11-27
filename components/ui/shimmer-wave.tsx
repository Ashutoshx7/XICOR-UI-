"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerWaveProps {
    text?: string;
    className?: string;
    duration?: number;
}

export function ShimmerWave({
    text = "Generating summary...",
    className,
    duration = 2.4,
}: ShimmerWaveProps) {
    const characters = text.split("");

    return (
        <div
            className={cn(
                "relative inline-flex [perspective:80px] [transform-style:preserve-3d]",
                // Default color variables (Cyan theme)
                "[--base-color:#46afc8] [--light-color:#e0f7fa] [--mid-color:#6ec6db] [--shadow-color:rgba(160,225,240,1)]",
                className
            )}
        >
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block text-base font-semibold origin-[100%_50%] [transform-style:preserve-3d]"
                    initial={{
                        color: "var(--base-color)",
                        textShadow: "0 0 0 transparent",
                        opacity: 1,
                    }}
                    animate={{
                        transform: [
                            "translate3d(0,0,0) scale(1) rotateY(0deg)", // 0%
                            "translate3d(2px,-1px,2px) scale(1.18) rotateY(6deg)", // 12%
                            "translate3d(0,0,0) scale(1) rotateY(0deg)", // 24%
                            "translate3d(0,0,0) scale(1) rotateY(0deg)", // 36%
                            "translate3d(0,0,0) scale(1) rotateY(0deg)", // 100%
                        ],
                        color: [
                            "var(--base-color)",
                            "var(--light-color)",
                            "var(--mid-color)",
                            "var(--base-color)",
                            "var(--base-color)",
                        ],
                        textShadow: [
                            "0 0 0 transparent",
                            "0 0 0 transparent",
                            "0 0 1px var(--shadow-color)",
                            "0 0 0 transparent",
                            "0 0 0 transparent",
                        ],
                        opacity: [1, 1, 1, 1, 0.8],
                    }}
                    transition={{
                        duration: duration,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: i * 0.05,
                        times: [0, 0.12, 0.24, 0.36, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
}
