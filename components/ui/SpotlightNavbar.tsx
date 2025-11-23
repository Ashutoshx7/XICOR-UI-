"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    href: string;
}

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
}

export function SpotlightNavbar({
    items = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "Sponsors", href: "#sponsors" },
        { label: "Pricing", href: "#pricing" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLElement>(null);
    const spotlightLightRef = useRef<SVGFEPointLightElement>(null);
    const ambienceLightRef = useRef<SVGFEPointLightElement>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!navRef.current || !spotlightLightRef.current) return;

        const nav = navRef.current;
        const light = spotlightLightRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = rect.height + 20;

            light.setAttribute("x", x.toString());
            light.setAttribute("y", y.toString());
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;
                const targetY = navRect.height + 20;

                const currentX = parseFloat(light.getAttribute("x") || "0");

                animate(currentX, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => light.setAttribute("x", v.toString())
                });
            }
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        }

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);
        nav.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
            nav.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [activeIndex]);

    // Ambience Light Logic (Active Item)
    useEffect(() => {
        if (!navRef.current || !ambienceLightRef.current) return;
        const nav = navRef.current;
        const light = ambienceLightRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;
            const targetY = navRect.height + 20;

            const currentX = parseFloat(light.getAttribute("x") || "0");

            animate(currentX, targetX, {
                type: "spring",
                stiffness: 200,
                damping: 20,
                onUpdate: (v) => light.setAttribute("x", v.toString())
            });
            light.setAttribute("y", targetY.toString());
        }
    }, [activeIndex]);

    const handleItemClick = (item: NavItem, index: number) => {
        setActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className="relative h-11 rounded-full border border-white/[0.15] bg-black/80 overflow-hidden"
            >
                {/* Actual interactive content */}
                <ul className="relative flex items-center h-full px-2 gap-0 z-[3]">
                    {items.map((item, idx) => (
                        <li key={idx} className="relative h-full flex items-center justify-center">
                            <a
                                href={item.href}
                                data-index={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item, idx);
                                }}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium transition-opacity duration-200",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80",
                                    activeIndex === idx ? "opacity-100 text-white" : "opacity-50 text-white/90 hover:opacity-80"
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Bottom border with spotlight effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] border-b border-white/30 z-[2] [filter:url(#spotlight)]" />

                {/* Bottom border with ambience effect for active item */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] border-b border-white/90 z-[3] [filter:url(#ambience)_brightness(1.8)] opacity-60" />
            </nav>

            {/* SVG Filters */}
            <svg className="absolute w-px h-px overflow-hidden -m-px p-0 [clip:rect(0,0,0,0)] whitespace-nowrap border-0">
                <filter id="spotlight">
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="2"
                        result="blur"
                    />
                    <feSpecularLighting
                        result="lighting"
                        in="blur"
                        surfaceScale="0.3"
                        specularConstant="1.8"
                        specularExponent="280"
                        lightingColor="#ffffff"
                    >
                        <fePointLight ref={spotlightLightRef} x="0" y="0" z="150" />
                    </feSpecularLighting>
                    <feComposite
                        in="lighting"
                        in2="SourceAlpha"
                        operator="in"
                        result="litPaint"
                    />
                </filter>
                <filter id="ambience">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feSpecularLighting
                        result="lighting"
                        in="blur"
                        surfaceScale="0.3"
                        specularConstant="1.5"
                        specularExponent="220"
                        lightingColor="#ffffff"
                    >
                        <fePointLight ref={ambienceLightRef} x="0" y="0" z="350" />
                    </feSpecularLighting>
                    <feComposite in="lighting" in2="SourceAlpha" operator="in" result="litPaint" />
                </filter>
            </svg>
        </div>
    );
}
