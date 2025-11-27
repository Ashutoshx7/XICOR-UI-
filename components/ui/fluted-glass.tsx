"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface FlutedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "background" | "container";
}

export function FlutedGlass({
    className,
    children,
    variant = "background",
    ...props
}: FlutedGlassProps) {
    const filterId = useId();
    const filterUrl = `url(#${filterId})`;

    // Determine positioning based on variant
    const positionClass =
        variant === "background"
            ? "fixed inset-0 z-[-1]"
            : "relative w-full h-full min-h-[400px]";

    return (
        <>
            <div
                className={cn(
                    positionClass,
                    "overflow-hidden transition-colors duration-300",
                    // CSS Variables for theming defined via Tailwind arbitrary values
                    "[--stripe-color-default:#fff] dark:[--stripe-color-default:#000]",
                    "[--blending-mode:overlay] dark:[--blending-mode:difference]",
                    "[--vignette-color:rgba(0,0,0,0.1)] dark:[--vignette-color:rgba(0,0,0,0.6)]",
                    className
                )}
                {...props}
            >
                {/* Hero / Stripes Layer */}
                <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                        // Adaptable CSS Variables
                        "--stripe-color": "var(--stripe-color-default)",
                        "--bg": "var(--stripe-color)",
                        "--stripes": `repeating-linear-gradient(
              100deg,
              var(--stripe-color) 0%,
              var(--stripe-color) 7%,
              transparent 10%,
              transparent 12%,
              var(--stripe-color) 16%
            )`,
                        "--rainbow": `repeating-linear-gradient(
              100deg,
              #60a5fa 10%,
              #e879f9 15%,
              #60a5fa 20%,
              #5eead4 25%,
              #60a5fa 30%
            )`,
                        backgroundImage: "var(--stripes), var(--rainbow)",
                        backgroundSize: "300%, 200%",
                        backgroundPosition: "50% 50%, 50% 50%",
                        filter: "blur(10px) opacity(50%) saturate(200%)",
                    } as React.CSSProperties}
                >
                    {/* Animated Background Inner */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "var(--stripes), var(--rainbow)",
                            backgroundSize: "200%, 100%",
                            animation: "smoothBg 60s linear infinite",
                            backgroundAttachment: "fixed",
                            mixBlendMode: "var(--blending-mode)" as any,
                        }}
                    />
                </div>

                {/* Glass / Distortion Layer */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        backdropFilter: `contrast(0.9) blur(7px) ${filterUrl}`,
                        WebkitBackdropFilter: `contrast(0.9) blur(7px) ${filterUrl}`,
                        mixBlendMode: "var(--blending-mode)" as any,
                        opacity: 0.8,
                    }}
                />

                {/* Vignette Overlay for Depth */}
                <div
                    className="absolute inset-0 pointer-events-none z-[0]"
                    style={{
                        background: `
              radial-gradient(circle at bottom left, var(--vignette-color) 0%, transparent 50%),
              radial-gradient(circle at bottom right, var(--vignette-color) 0%, transparent 50%)
            `,
                    }}
                />

                {/* Content Layer */}
                {children && (
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                        {children}
                    </div>
                )}
            </div>

            {/* SVG Filter Definition */}
            <svg
                className="fixed w-0 h-0 pointer-events-none opacity-0"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id={filterId} primitiveUnits="objectBoundingBox">
                    <feImage
                        x="0"
                        y="0"
                        result="image_0"
                        crossOrigin="anonymous"
                        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'><g><rect width='1' height='1' fill='black' /><rect width='1' height='1' fill='url(%23red)' style='mix-blend-mode:screen' /><rect width='1' height='1' fill='url(%23green)' style='mix-blend-mode:screen' /><rect width='1' height='1' fill='url(%23yellow)' style='mix-blend-mode:screen' /></g><defs><radialGradient id='yellow' cx='0' cy='0' r='1' ><stop stop-color='yellow' /><stop stop-color='yellow' offset='1' stop-opacity='0' /></radialGradient><radialGradient id='green' cx='1' cy='0' r='1' ><stop stop-color='green' /><stop stop-color='green' offset='1' stop-opacity='0' /></radialGradient><radialGradient id='red' cx='0' cy='1' r='1' ><stop stop-color='red' /><stop stop-color='red' offset='1' stop-opacity='0' /></radialGradient></defs></svg>"
                        preserveAspectRatio="none meet"
                        width=".03"
                        height="1"
                    />
                    <feTile in="image_0" result="tile_0" />
                    <feGaussianBlur
                        stdDeviation=".0001"
                        edgeMode="none"
                        in="tile_0"
                        result="bar_smoothness"
                        x="0"
                        y="0"
                    />
                    <feDisplacementMap
                        scale=".08"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        in="SourceGraphic"
                        in2="bar_smoothness"
                        result="displacement_0"
                    />
                </filter>
            </svg>
        </>
    );
}
