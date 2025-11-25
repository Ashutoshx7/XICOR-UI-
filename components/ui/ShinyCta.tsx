"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShinyCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fluid?: boolean; // full width
}

const ShinyCta = React.forwardRef<HTMLButtonElement, ShinyCtaProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      fluid = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-5 py-2 text-sm",
      md: "px-10 py-5 text-lg",
      lg: "px-14 py-6 text-xl",
    };

    return (
      <>
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isLoading || props.disabled}
          className={cn(
            "shiny-cta leading-[1.2] rounded-full transition-all duration-300",
            sizeClasses[size],
            fluid && "w-full",
            props.disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            className
          )}
          {...props}
        >
          <span>{isLoading ? "Loading..." : children}</span>
        </motion.button>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,500&display=swap");

          :root {
            --shiny-cta-bg: #000000;
            --shiny-cta-bg-subtle: #1a1818;
            --shiny-cta-fg: #ffffff;
            --shiny-cta-highlight: blue;
            --shiny-cta-highlight-subtle: #8484ff;
          }

          @property --gradient-angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }

          @property --gradient-angle-offset {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }

          @property --gradient-percent {
            syntax: "<percentage>";
            initial-value: 5%;
            inherits: false;
          }

          @property --gradient-shine {
            syntax: "<color>";
            initial-value: white;
            inherits: false;
          }

          .shiny-cta {
            --animation: gradient-angle linear infinite;
            --duration: 3s;
            --shadow-size: 2px;
            isolation: isolate;
            position: relative;
            overflow: hidden;
            outline-offset: 4px;
            font-family: inherit;
            font-size: 1.125rem;
            line-height: 1.2;
            border: 1px solid transparent;
            border-radius: 360px;
            color: var(--shiny-cta-fg);

            background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
              conic-gradient(
                  from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                  transparent,
                  var(--shiny-cta-highlight) var(--gradient-percent),
                  var(--gradient-shine) calc(var(--gradient-percent) * 2),
                  var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
                  transparent calc(var(--gradient-percent) * 4)
                )
                border-box;

            box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          }

          .shiny-cta::before,
          .shiny-cta::after,
          .shiny-cta span::before {
            content: "";
            pointer-events: none;
            position: absolute;
            inset-inline-start: 50%;
            inset-block-start: 50%;
            translate: -50% -50%;
            z-index: -1;
          }

          .shiny-cta::before {
            --size: calc(100% - var(--shadow-size) * 3);
            --position: 2px;
            --space: calc(var(--position) * 2);
            width: var(--size);
            height: var(--size);
            background: radial-gradient(
                circle at var(--position) var(--position),
                white calc(var(--position) / 4),
                transparent 0
              )
              padding-box;
            background-size: var(--space) var(--space);
            background-repeat: space;
            mask-image: conic-gradient(
              from calc(var(--gradient-angle) + 45deg),
              black,
              transparent 10% 90%,
              black
            );
            border-radius: inherit;
            opacity: 0.4;
          }

          .shiny-cta::after {
            --animation: shimmer linear infinite;
            width: 100%;
            aspect-ratio: 1;
            background: linear-gradient(
              -50deg,
              transparent,
              var(--shiny-cta-highlight),
              transparent
            );
            mask-image: radial-gradient(circle at bottom, transparent 40%, black);
            opacity: 0.6;
          }

          .shiny-cta span {
            position: relative;
            z-index: 1;
          }

          .shiny-cta span::before {
            --size: calc(100% + 1rem);
            width: var(--size);
            height: var(--size);
            box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
            opacity: 0;
          }

          .shiny-cta {
            --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);
            transition: var(--transition);
            transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
          }

          .shiny-cta,
          .shiny-cta::before,
          .shiny-cta::after {
            animation: var(--animation) var(--duration),
              var(--animation) calc(var(--duration) / 0.4) reverse paused;
            animation-composition: add;
          }

          .shiny-cta span::before {
            transition: opacity var(--transition);
            animation: calc(var(--duration) * 1.5) breathe linear infinite;
          }

          @keyframes gradient-angle {
            to {
              --gradient-angle: 360deg;
            }
          }

          @keyframes shimmer {
            to {
              rotate: 360deg;
            }
          }
        `}</style>
      </>
    );
  }
);

ShinyCta.displayName = "ShinyCta";

export default ShinyCta;
