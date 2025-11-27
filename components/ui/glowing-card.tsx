import React from 'react';
import { cn } from "@/lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export function GlowingCard({ title = "Glowing Card", className, children, ...props }: GlowingCardProps) {
    return (
        <div className={cn("glowing-card", className)} {...props}>
            {children || title}
        </div>
    );
}
