"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface GridCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const GridCard = ({ title, description, icon, className, ...props }: GridCardProps) => {
    return (
        <div
            className={cn(
                "group relative w-full h-full min-h-[300px] rounded-[15px] p-6 cursor-pointer overflow-hidden",
                "bg-zinc-50 dark:bg-[#18181B] border border-zinc-200 dark:border-white/10 shadow-[0_3px_6px_rgba(0,0,0,0.05)]",
                "transition-colors duration-300 hover:border-zinc-300 dark:hover:border-white/20",
                className
            )}
            {...props}
        >
            {/* Background Tiles & Lines Container */}
            <div
                className="absolute inset-0 rounded-[15px] bg-black/[0.015] dark:bg-white/[0.015] overflow-hidden transition-colors duration-300"
                style={{
                    maskImage: 'radial-gradient(circle at bottom left, transparent 0%, transparent 100px, black 300px)',
                    WebkitMaskImage: 'radial-gradient(circle at bottom left, transparent 0%, transparent 100px, black 300px)'
                }}
            >
                {/* Tiles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tiles.map((tile, i) => (
                        <div
                            key={i}
                            className={cn("absolute bg-emerald-500/[0.05]", tile.animationClass)}
                            style={{
                                top: tile.top,
                                left: tile.left,
                                width: tile.width,
                                height: tile.height,
                            }}
                        />
                    ))}
                </div>

                {/* Lines */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Horizontal Lines */}
                    <div className="absolute left-0 right-0 h-[1px] bg-zinc-200 dark:bg-[#2A2B2C] top-[10%] transition-colors duration-300" />
                    <div className="absolute left-0 right-0 h-[1px] bg-zinc-200 dark:bg-[#2A2B2C] top-[32.5%] transition-colors duration-300" />
                    <div className="absolute left-0 right-0 h-[1px] bg-zinc-200 dark:bg-[#2A2B2C] top-[55%] transition-colors duration-300" />

                    {/* Vertical Lines */}
                    <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-[#2A2B2C] left-[22.5%] transition-colors duration-300" />
                    <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-[#2A2B2C] left-[50%] transition-colors duration-300" />
                    <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-[#2A2B2C] right-[22.5%] transition-colors duration-300" />
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute left-1/2 bottom-[55%] -translate-x-1/2 w-[150%] pb-[150%] rounded-full bg-[conic-gradient(from_205deg_at_50%_50%,rgba(16,185,129,0)_0deg,#10B981_25deg,rgba(52,211,153,0.18)_295deg,rgba(16,185,129,0)_360deg)] blur-[35px] opacity-10" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full pointer-events-none text-left pb-8">
                <div className="mb-auto p-2 inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 backdrop-blur-[2px] w-10 h-10 text-zinc-500 dark:text-zinc-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors duration-300">
                    {icon || (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )}
                </div>

                <div className="mt-auto">
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-base tracking-wide transition-colors duration-300">{title}</h4>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-4 transition-colors duration-300" style={{ textWrap: "balance" }}>{description}</p>
                </div>
            </div>
        </div>
    );
};

// Tile configurations based on the original CSS
const tiles = [
    { top: '0%', left: '0%', width: '22.5%', height: '10%', animationClass: 'animate-tile-1' },
    { top: '0%', left: '22.5%', width: '27.5%', height: '10%', animationClass: 'animate-tile-2' },
    { top: '0%', left: '50%', width: '27.5%', height: '10%', animationClass: 'animate-tile-3' },
    { top: '0%', left: '77.5%', width: '22.5%', height: '10%', animationClass: 'animate-tile-4' },
    { top: '10%', left: '0%', width: '22.5%', height: '22.5%', animationClass: 'animate-tile-1' },
    { top: '10%', left: '22.5%', width: '27.5%', height: '22.5%', animationClass: 'animate-tile-2' },
    { top: '10%', left: '50%', width: '27.5%', height: '22.5%', animationClass: 'animate-tile-3' },
    { top: '10%', left: '77.5%', width: '22.5%', height: '22.5%', animationClass: 'animate-tile-4' },
    { top: '32.5%', left: '50%', width: '27.5%', height: '22.5%', animationClass: 'animate-tile-3' },
    { top: '32.5%', left: '77.5%', width: '22.5%', height: '22.5%', animationClass: 'animate-tile-4' },
];
