"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ShinyCtaProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fluid?: boolean;
  target?: string;
  rel?: string;
}

const MotionLink = motion(Link);

const ShinyCta = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ShinyCtaProps>(
  (
    {
      className,
      children,
      href,
      variant = "default",
      size = "md",
      fluid = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Component = href ? MotionLink : motion.button;

    // Size styles
    const sizeClasses = {
      sm: "h-10 px-6 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    // Gradient Colors for the border beam
    const gradientColors = {
      default: "from-transparent via-blue-500 to-transparent",
      primary: "from-transparent via-white to-transparent",
      secondary: "from-transparent via-neutral-500 to-transparent",
      dark: "from-transparent via-white to-transparent",
    };

    // Inner Background Colors
    const innerBgClasses = {
      default: "bg-neutral-950",
      primary: "bg-blue-600",
      secondary: "bg-neutral-200",
      dark: "bg-black",
    };

    // Text Colors
    const textClasses = {
      default: "text-white",
      primary: "text-white",
      secondary: "text-neutral-900",
      dark: "text-white",
    };

    return (
      <Component
        ref={ref as any}
        href={href || ""}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50",
          fluid && "w-full",
          (disabled || isLoading) && "opacity-50 cursor-not-allowed",
          className
        )}
        {...(props as any)}
      >
        {/* Spinning Gradient (The Border Beam) */}
        <motion.div
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, #0000 0%, #0000 50%, ${variant === "default" ? "#3b82f6" :
                variant === "primary" ? "#ffffff" :
                  variant === "secondary" ? "#737373" : "#ffffff"
              } 100%)`,
          }}
        />

        {/* Inner Content (Covers the center) */}
        <span
          className={cn(
            "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-3 py-1 text-sm font-medium backdrop-blur-3xl transition-colors",
            innerBgClasses[variant],
            textClasses[variant],
            sizeClasses[size]
          )}
        >
          {/* Subtle Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              repeatDelay: 1,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, white, transparent)",
            }}
          />

          <span className="relative z-10 flex items-center gap-2">
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {children}
          </span>
        </span>
      </Component>
    );
  }
);

ShinyCta.displayName = "ShinyCta";

export default ShinyCta;
