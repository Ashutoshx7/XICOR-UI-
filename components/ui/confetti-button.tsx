"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, HTMLMotionProps } from "framer-motion";

interface ConfettiButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: React.ReactNode;
    variant?: "default" | "white" | "grey";
}

const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
    ({ className, children, variant = "default", onClick, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [isHovered, setIsHovered] = useState(false);
        const [isSuccess, setIsSuccess] = useState(false);
        const controls = useAnimation();
        const cannonControls = useAnimation();

        // Mouse move effect for 3D rotation
        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rx = (y / rect.height) * 10 * -1; // Reduced tilt
            const ry = (x / rect.width) * 10; // Reduced tilt

            buttonRef.current.style.setProperty("--rx", `${rx}deg`);
            buttonRef.current.style.setProperty("--ry", `${ry}deg`);
        };

        const handleMouseLeave = () => {
            if (!buttonRef.current) return;
            buttonRef.current.style.setProperty("--rx", "0deg");
            buttonRef.current.style.setProperty("--ry", "0deg");
            setIsHovered(false);
        };

        const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) onClick(e);
            if (isSuccess) return;

            setIsSuccess(true);

            // Animate Cannon
            await cannonControls.start({
                x: -3,
                y: 3,
                transition: { duration: 0.2 },
            });

            // Reset Cannon
            await cannonControls.start({
                x: 0,
                y: 0,
                transition: { duration: 1, ease: "backOut" },
            });

            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        };

        // Variant Styles
        const variantStyles = {
            default: {
                "--background": "#000000", // Complete black
                "--color": "#FFFFFF",
                "--shadow": "rgba(0, 0, 0, 0.1)",
                "--cannon-dark": "#d4d4d4", // Light for contrast on black
                "--cannon-light": "#ffffff",
                "--cannon-rim": "#a3a3a3",
                "--cannon-shadow": "rgba(0, 0, 0, 0.5)",
                "--confetti-1": "#892AB8",
                "--confetti-2": "#EA4C89",
                "--confetti-3": "#FFFF04",
                "--confetti-4": "#4AF2FD",
            },
            white: {
                "--background": "#ffffff",
                "--color": "#000000",
                "--border": "#e5e5e5", // Neutral-200
                "--shadow": "0 2px 4px rgba(0,0,0,0.05)",
                "--cannon-dark": "#2563eb", // Blue
                "--cannon-light": "#60a5fa", // Lighter Blue
                "--cannon-rim": "#1e40af", // Darker Blue Rim
                "--cannon-shadow": "rgba(0, 0, 0, 0.1)",
                "--confetti-1": "#892AB8",
                "--confetti-2": "#EA4C89",
                "--confetti-3": "#FFFF04",
                "--confetti-4": "#4AF2FD",
            },
            grey: {
                "--background": "#f5f5f5",
                "--color": "#171717",
                "--shadow": "rgba(0, 0, 0, 0.05)",
                "--cannon-dark": "#2563eb", // Blue
                "--cannon-light": "#60a5fa", // Lighter Blue
                "--cannon-rim": "#1e40af", // Darker Blue Rim
                "--cannon-shadow": "rgba(0, 0, 0, 0.1)",
                "--confetti-1": "#892AB8",
                "--confetti-2": "#EA4C89",
                "--confetti-3": "#FFFF04",
                "--confetti-4": "#4AF2FD",
            },
        };

        const currentStyle = variantStyles[variant] as React.CSSProperties;

        return (
            <motion.button
                ref={buttonRef}
                className={cn(
                    "relative group outline-none cursor-pointer border-0 bg-transparent p-0",
                    "font-sans font-medium text-sm leading-[26px] tracking-wide",
                    "transform-gpu preserve-3d transition-transform duration-100",
                    isSuccess && "success",
                    className
                )}
                style={
                    {
                        ...currentStyle,
                        transform: "perspective(440px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
                    } as any
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
                onClick={handleClick}
                {...props}
            >
                {/* Button Background */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-lg bg-[var(--background)] shadow-[0_2px_8px_var(--shadow)] transition-all duration-200",
                        "group-hover:shadow-[0_4px_12px_var(--shadow)] group-hover:scale-[1.02]",
                        variant === "white" && "border border-[var(--border)] shadow-sm"
                    )}
                    style={{ transform: "translateZ(-2px)" }}
                />

                <div className="relative z-10 flex items-center px-6 py-2.5">
                    {/* Icon / Cannon Container */}
                    <motion.div
                        className="relative w-6 h-3.5 mr-4 mt-2 opacity-80 group-hover:opacity-100 transition-opacity"
                        animate={cannonControls}
                        style={{ transform: "translateZ(2px)" }}
                    >
                        {/* Cannon Body */}
                        <div className="cannon relative w-6 h-3.5 translate-y-[3px] -rotate-45 drop-shadow-[-2px_2px_2px_var(--cannon-shadow)]">
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, var(--cannon-dark), var(--cannon-light))",
                                    clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                                }}
                            />
                            {/* Hollow Mouth */}
                            <div
                                className="absolute -right-[2px] top-0 w-1.5 h-3.5 rounded-[100%]"
                                style={{
                                    boxShadow: "inset 0 0 0 1px var(--cannon-rim)",
                                    background: "linear-gradient(to right, var(--cannon-rim), var(--cannon-light))",
                                }}
                            />
                        </div>

                        {/* Confetti Container */}
                        <div className="confetti absolute left-[20px] bottom-[10px] pointer-events-none">
                            {/* Particles */}
                            {isSuccess && <ConfettiParticles />}
                        </div>
                    </motion.div>

                    <span className="text-[var(--color)]">{children}</span>
                </div>
            </motion.button>
        );
    }
);

const ConfettiParticles = () => {
    const colors = ["#FFFF04", "#EA4C89", "#892AB8", "#4AF2FD"]; // Original Vibrant Colors

    // Generate random particles
    const particles = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 - 40,
        y: Math.random() * -60 - 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.5 + 0.4,
        rotation: Math.random() * 360,
    }));

    return (
        <div className="absolute left-1 bottom-1 w-0 h-0 z-50">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                    animate={{
                        opacity: 0,
                        x: p.x,
                        y: p.y,
                        scale: p.scale,
                        rotate: p.rotation + 180,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute w-1 h-1 rounded-[1px] shadow-sm"
                    style={{ backgroundColor: p.color }}
                />
            ))}
        </div>
    );
};

ConfettiButton.displayName = "ConfettiButton";

export default ConfettiButton;
