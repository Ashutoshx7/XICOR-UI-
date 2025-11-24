"use client";

import React from "react";
import styles from "./ShinyCta.module.css";
import { cn } from "@/lib/utils";

interface ShinyCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const ShinyCta = React.forwardRef<HTMLButtonElement, ShinyCtaProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative px-10 py-5 text-lg leading-[1.2]",
                    styles.shinyCta,
                    className
                )}
                {...props}
            >
                <span>{children}</span>
            </button>
        );
    }
);

ShinyCta.displayName = "ShinyCta";

export default ShinyCta;
