"use client";

import React, { useEffect, useRef } from "react";
import styles from "./AHole.module.css";

// Easing function: inExpo
const easeInExpo = (x: number): number => {
    return x === 0 ? 0 : Math.pow(2, 10 * (x - 1));
};

interface Disc {
    x: number;
    y: number;
    w: number;
    h: number;
    p: number;
}

interface Particle {
    x: number;
    y: number;
    sx: number;
    dx: number;
    vy: number;
    p: number;
    r: number;
    c: string;
}

interface Rect {
    width: number;
    height: number;
}

interface Clip {
    disc?: Disc;
    i?: number;
    path?: Path2D;
}

const AHole: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let discs: Disc[] = [];
        let lines: { x: number; y: number }[][] = [];
        let particles: Particle[] = [];
        let rect: Rect = { width: 0, height: 0 };
        let render = { width: 0, height: 0, dpi: 1 };
        let clip: Clip = {};
        let startDisc: Disc = { x: 0, y: 0, w: 0, h: 0, p: 0 };
        let endDisc: Disc = { x: 0, y: 0, w: 0, h: 0, p: 0 };
        let particleArea: { sx: number; ex: number; sw: number; ew: number; h: number } = { sx: 0, ex: 0, sw: 0, ew: 0, h: 0 };
        let linesCanvas: HTMLCanvasElement | null = null;

        // Initialize
        const setSize = () => {
            const bounds = container.getBoundingClientRect();
            rect = { width: bounds.width, height: bounds.height };
            render = {
                width: rect.width,
                height: rect.height,
                dpi: window.devicePixelRatio || 1,
            };

            canvas.width = render.width * render.dpi;
            canvas.height = render.height * render.dpi;
        };

        const tweenValue = (
            start: number,
            end: number,
            p: number,
            ease: boolean = false
        ) => {
            const delta = end - start;
            const easeFn = ease ? easeInExpo : (t: number) => t;
            return start + delta * easeFn(p);
        };

        const tweenDisc = (disc: Partial<Disc>) => {
            if (disc.p === undefined) return disc as Disc;

            const newDisc = { ...disc } as Disc;
            newDisc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
            newDisc.y = tweenValue(startDisc.y, endDisc.y, disc.p, true);
            newDisc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
            newDisc.h = tweenValue(startDisc.h, endDisc.h, disc.p);
            return newDisc;
        };

        const setDiscs = () => {
            const { width, height } = rect;
            discs = [];

            startDisc = {
                x: width * 0.5,
                y: height * 0.45,
                w: width * 0.75,
                h: height * 0.7,
                p: 0
            };

            endDisc = {
                x: width * 0.5,
                y: height * 0.95,
                w: 0,
                h: 0,
                p: 1
            };

            const totalDiscs = 100;
            let prevBottom = height;
            clip = {};

            for (let i = 0; i < totalDiscs; i++) {
                const p = i / totalDiscs;
                const disc = tweenDisc({ p });
                const bottom = disc.y + disc.h;

                if (bottom <= prevBottom) {
                    clip = {
                        disc: { ...disc },
                        i,
                    };
                }
                prevBottom = bottom;
                discs.push(disc);
            }

            clip.path = new Path2D();
            if (clip.disc) {
                clip.path.ellipse(
                    clip.disc.x,
                    clip.disc.y,
                    clip.disc.w,
                    clip.disc.h,
                    0,
                    0,
                    Math.PI * 2
                );
                clip.path.rect(
                    clip.disc.x - clip.disc.w,
                    0,
                    clip.disc.w * 2,
                    clip.disc.y
                );
            }
        };

        const setLines = () => {
            const { width, height } = rect;
            lines = [];
            const totalLines = 100;
            const linesAngle = (Math.PI * 2) / totalLines;

            for (let i = 0; i < totalLines; i++) {
                lines.push([]);
            }

            discs.forEach((disc) => {
                for (let i = 0; i < totalLines; i++) {
                    const angle = i * linesAngle;
                    const p = {
                        x: disc.x + Math.cos(angle) * disc.w,
                        y: disc.y + Math.sin(angle) * disc.h,
                    };
                    lines[i].push(p);
                }
            });

            // Use document.createElement('canvas') instead of OffscreenCanvas for better compatibility
            linesCanvas = document.createElement("canvas");
            linesCanvas.width = width;
            linesCanvas.height = height;
            const lCtx = linesCanvas.getContext("2d");

            if (!lCtx) return;

            lines.forEach((line) => {
                lCtx.save();
                let lineIsIn = false;

                line.forEach((p1, j) => {
                    if (j === 0) return;
                    const p0 = line[j - 1];

                    if (clip.path &&
                        !lineIsIn &&
                        (lCtx.isPointInPath(clip.path, p1.x, p1.y) ||
                            lCtx.isPointInStroke(clip.path, p1.x, p1.y))
                    ) {
                        lineIsIn = true;
                    } else if (lineIsIn && clip.path) {
                        lCtx.clip(clip.path);
                    }

                    lCtx.beginPath();
                    lCtx.moveTo(p0.x, p0.y);
                    lCtx.lineTo(p1.x, p1.y);
                    lCtx.strokeStyle = "#444";
                    lCtx.lineWidth = 2;
                    lCtx.stroke();
                    lCtx.closePath();
                });
                lCtx.restore();
            });
        };

        const initParticle = (start = false): Particle => {
            const sx = particleArea.sx + particleArea.sw * Math.random();
            const ex = particleArea.ex + particleArea.ew * Math.random();
            const dx = ex - sx;
            // Unused variable vx
            // const vx = 0.1 + Math.random() * 0.5;
            const y = start ? particleArea.h * Math.random() : particleArea.h;
            const r = 0.5 + Math.random() * 4;
            const vy = 0.5 + Math.random();

            return {
                x: sx,
                sx,
                dx,
                y,
                vy,
                p: 0,
                r,
                c: `rgba(255, 255, 255, ${Math.random()})`,
            };
        };

        const setParticles = () => {
            const { width, height } = rect;
            particles = [];

            if (clip.disc) {
                const sw = clip.disc.w * 0.5;
                const ew = clip.disc.w * 2;
                const h = height * 0.85;
                const sx = (width - sw) / 2;
                const ex = (width - ew) / 2;

                particleArea = { sw, ew, h, sx, ex };

                const totalParticles = 100;
                for (let i = 0; i < totalParticles; i++) {
                    particles.push(initParticle(true));
                }
            }
        };

        const moveDiscs = () => {
            discs.forEach((disc) => {
                disc.p = (disc.p + 0.001) % 1;
                // Update disc in place
                const newDisc = tweenDisc(disc);
                disc.x = newDisc.x;
                disc.y = newDisc.y;
                disc.w = newDisc.w;
                disc.h = newDisc.h;
            });
        };

        const moveParticles = () => {
            particles.forEach((particle) => {
                particle.p = 1 - particle.y / particleArea.h;
                particle.x = particle.sx + particle.dx * particle.p;
                particle.y -= particle.vy;

                if (particle.y < 0) {
                    const newP = initParticle();
                    particle.x = newP.x;
                    particle.y = newP.y;
                    particle.p = newP.p;
                    particle.c = newP.c;
                }
            });
        };

        const drawDiscs = () => {
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 2;

            // Outer disc
            const outer = startDisc;
            ctx.beginPath();
            ctx.ellipse(outer.x, outer.y, outer.w, outer.h, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();

            // Discs
            discs.forEach((disc, i) => {
                if (i % 5 !== 0) return;

                let clipped = false;
                if (clip.disc && clip.path && disc.w < clip.disc.w - 5) {
                    ctx.save();
                    ctx.clip(clip.path);
                    clipped = true;
                }

                ctx.beginPath();
                ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();

                if (clipped) {
                    ctx.restore();
                }
            });
        };

        const drawLines = () => {
            if (linesCanvas) {
                ctx.drawImage(linesCanvas, 0, 0);
            }
        };

        const drawParticles = () => {
            if (!clip.path) return;
            ctx.save();
            ctx.clip(clip.path);

            particles.forEach((particle) => {
                ctx.fillStyle = particle.c;
                ctx.beginPath();
                ctx.rect(particle.x, particle.y, particle.r, particle.r);
                ctx.closePath();
                ctx.fill();
            });

            ctx.restore();
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(render.dpi, render.dpi);

            moveDiscs();
            moveParticles();

            drawDiscs();
            drawLines();
            drawParticles();

            ctx.restore();

            requestRef.current = requestAnimationFrame(tick);
        };

        const onResize = () => {
            setSize();
            setDiscs();
            setLines();
            setParticles();
        };

        // Initial setup
        onResize();
        requestRef.current = requestAnimationFrame(tick);

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <canvas className={styles.canvas} ref={canvasRef} />
            <div className={styles.aura} />
            <div className={styles.overlay} />
        </div>
    );
};

export default AHole;
