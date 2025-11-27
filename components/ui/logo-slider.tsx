"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoSliderProps {
    logos: React.ReactNode[];
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

export const LogoSlider = ({
    logos,
    speed = 60,
    direction = "left",
    className,
}: LogoSliderProps) => {
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <div
                className="container-slider-logo relative flex items-center w-full h-14 overflow-hidden"
                style={
                    {
                        "--speed": speed,
                        "--count": logos.length,
                        "--blurs": 8,
                        "--blur": 1,
                    } as React.CSSProperties
                }
                data-direction={direction}
                data-blurring="true"
            >
                {/* Progressive Blur Overlay Left */}
                <div className="blur-overlay blur--left absolute top-0 bottom-0 left-0 z-10 w-24 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0"
                            style={
                                {
                                    "--index": i,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>

                {/* Progressive Blur Overlay Right */}
                <div className="blur-overlay blur--right absolute top-0 bottom-0 right-0 z-10 w-24 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0"
                            style={
                                {
                                    "--index": i,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>

                {/* Logo Track */}
                <ul className="ul-logos flex items-center gap-16 m-0 p-0 list-none h-full w-max">
                    {duplicatedLogos.map((logo, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-center h-10 w-24"
                            style={
                                {
                                    "--index": index,
                                } as React.CSSProperties
                            }
                        >
                            <div className="w-full h-full flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-current">
                                {logo}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
