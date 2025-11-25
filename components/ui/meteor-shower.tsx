"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MeteorProps {
    width?: number;
    height?: number;
    color?: string;
    collision?: boolean;
}

class Meteor {
    canvas: HTMLCanvasElement;
    options: any;
    context: CanvasRenderingContext2D;
    meteorWidth: number;
    meteorSpeed: number;
    meteorLength: number;
    gradient!: CanvasGradient;
    particles: any[];
    sparks: any[] = [];
    exploder: any;
    collided: boolean = false;
    imminentCollision: boolean = false;
    ignite!: (ignite: boolean) => void;

    constructor(options: any) {
        const that = this;
        this.canvas = options.element;
        this.options = options;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
        this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
        this.meteorWidth = that.options.width;
        this.meteorSpeed = gsap.utils.mapRange(4, 12, 6, 12, that.meteorWidth);
        this.meteorLength = gsap.utils.mapRange(4, 12, 50, 80, that.meteorWidth);

        // Create a reusable gradient
        that.gradient = that.context.createLinearGradient(
            that.canvas.width * 0.5,
            that.canvas.height * 0.5,
            that.canvas.width * 0.5,
            0
        );
        that.gradient.addColorStop(0, "white");
        that.gradient.addColorStop(0.025, "rgba(255, 255, 255, 0.7)");
        that.gradient.addColorStop(0.15, "rgba(255, 255, 255, 0.4)");
        that.gradient.addColorStop(0.55, "rgba(255, 255, 255, 0.2)");
        that.gradient.addColorStop(1, "transparent");

        this.particles = that.genParticles(gsap.utils.random(50, 100, 1));
        this.setParticlesMotion();

        this.draw = this.draw.bind(this);
        gsap.ticker.add(this.draw);

        // Simplified collision logic for grid mode (mostly just falling)
        that.ignite = (ignite: boolean) => {
            const speed = gsap.utils.random(5, 10, 0.1);
            const delay = gsap.utils.random(0, 5, 0.1);
            that.canvas.style.setProperty("--speed", `${speed}s`);
            that.canvas.style.setProperty("--delay", `${delay}s`);

            const anim = that.canvas.getAnimations()[0];
            if (anim) {
                anim.cancel();
                anim.play();
            }
        };
        that.ignite(false);
    }

    genParticles(amount: number) {
        const that = this;
        const particles = [];
        for (let p = 0; p < amount; p++) {
            const particle = {
                size: gsap.utils.random(1, that.options.width * 1.25, 1) * window.devicePixelRatio,
                x: 0,
                y: 0,
                speed: 0,
                dead: false,
                tl: null as any
            };
            particles.push(particle);
        }
        return particles;
    }

    draw() {
        const that = this;
        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);

        // Draw particles
        for (const particle of that.particles.filter((p) => !p.dead)) {
            that.context.beginPath();
            that.context.fillStyle = that.gradient;
            that.context.arc(particle.x, particle.y, particle.size / 2, 0, 2 * Math.PI);
            that.context.fill();
        }

        // Draw head
        that.context.beginPath();
        const radius = (that.meteorWidth / 2) * window.devicePixelRatio;
        that.context.arc(
            that.canvas.width * 0.5,
            that.canvas.height * 0.5 - radius,
            radius,
            0,
            1 * Math.PI
        );
        that.context.fill();

        // Draw tail
        that.context.fillStyle = that.gradient;
        that.context.moveTo(that.canvas.width * 0.5 - radius, that.canvas.height * 0.5 - radius);
        that.context.lineTo(that.canvas.width * 0.5, that.canvas.height * 0.5 - that.meteorLength * window.devicePixelRatio);
        that.context.lineTo(that.canvas.width * 0.5 + radius, that.canvas.height * 0.5 - radius);
        that.context.fill();
    }

    setParticlesMotion() {
        const that = this;
        for (const particle of that.particles) {
            particle.x = that.canvas.width * 0.5;
            particle.y = that.canvas.height * 0.5;
            particle.speed = gsap.utils.mapRange(4, 12, 2, 1, that.meteorWidth);
            particle.dead = false;
            if (particle.size === 0)
                particle.size = gsap.utils.random(1, that.options.width * 1.25, 1) * window.devicePixelRatio;
            if (particle.tl) particle.tl.kill();
            particle.tl = gsap.timeline().to(particle, {
                x: () => gsap.utils.random(that.canvas.width * 0.5 - that.meteorWidth * 2.5, that.canvas.width * 0.5 + that.meteorWidth * 2.5, 1),
                y: () => gsap.utils.random(0, 0, 1),
                size: 0,
                repeat: -1,
                ease: "power4.out",
                repeatDelay: Math.random(),
                delay: particle.speed * -1,
                duration: particle.speed,
            });
        }
    }

    destroy() {
        gsap.ticker.remove(this.draw);
        this.particles.forEach(p => p.tl?.kill());
    }
}

export const MeteorGrid = ({ className }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const meteorsRef = useRef<Meteor[]>([]);
    const [gridLines, setGridLines] = useState<number[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Calculate grid lines based on width
        const updateGrid = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const gap = 100; // Grid gap in pixels
            const lines = Math.floor(width / gap);
            setGridLines(Array.from({ length: lines }, (_, i) => (i + 1) * gap));
        };

        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, []);

    useEffect(() => {
        // Initialize meteors for existing canvases
        const canvases = containerRef.current?.querySelectorAll("canvas");
        if (!canvases) return;

        // Clean up old meteors
        meteorsRef.current.forEach(m => m.destroy());
        meteorsRef.current = [];

        canvases.forEach((c) => {
            const meteor = new Meteor({
                element: c,
                width: gsap.utils.random(2, 5, 1), // Thinner meteors for grid
            });
            meteorsRef.current.push(meteor);
        });

        return () => {
            meteorsRef.current.forEach(m => m.destroy());
            meteorsRef.current = [];
        };
    }, [gridLines]); // Re-init when grid lines change

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-[600px] overflow-hidden bg-neutral-950 border-y border-neutral-800",
                className
            )}
            style={{
                backgroundImage: `
                linear-gradient(to right, #262626 1px, transparent 1px),
                linear-gradient(to bottom, #262626 1px, transparent 1px)
            `,
                backgroundSize: '100px 100px',
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
            }}
        >
            {/* Generate meteors aligned with grid lines */}
            {gridLines.map((left, i) => (
                // Randomly decide if a line gets a meteor to avoid overcrowding, or add multiple
                Math.random() > 0.3 && (
                    <div
                        key={i}
                        className="absolute top-0 w-[2px] h-[150%] -translate-y-1/2 pointer-events-none"
                        style={{
                            left: `${left}px`,
                            transform: 'translateY(-50%) rotate(0deg)', // Vertical fall
                        }}
                    >
                        <canvas
                            className="meteor-canvas absolute bottom-full left-1/2 -translate-x-1/2"
                            style={{
                                width: '100px', // Canvas width
                                height: '100px', // Canvas height (aspect ratio 1)
                            }}
                        />
                    </div>
                )
            ))}

            <style jsx>{`
        .meteor-canvas {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
            animation: meteor-fall var(--speed, 6s) calc(var(--delay, 0s) * -1) infinite linear;
        }

        @keyframes meteor-fall {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(1000px); /* Adjust based on container height + buffer */
            }
        }
      `}</style>
        </div>
    );
};
