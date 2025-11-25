"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Components ---

function Hero() {
    return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:via-neutral-200 dark:to-neutral-500 sm:text-7xl"
            >
                Scroll animations
                <br />
                with Framer Motion
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl font-medium text-neutral-600 dark:text-neutral-400"
            >
                Silky smooth & performant
            </motion.div>
        </section>
    );
}

function CalendarSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 3D Rotate Effect for Desktop
    const rotateX = useTransform(scrollYProgress, [0, 0.3], [45, 0]);
    const translateZ = useTransform(scrollYProgress, [0, 0.3], [-400, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Slide In Effect for Mobile
    const mobileX = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
    const mobileOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="container mx-auto px-4 py-24 perspective-1000">
            <div className="relative mx-auto max-w-5xl">
                {/* Desktop Calendar (Wide) */}
                <motion.div
                    style={{ rotateX, z: translateZ, opacity }}
                    className="hidden aspect-[2/1] w-full origin-center rounded-xl border-4 border-neutral-200 bg-blue-100 shadow-2xl dark:border-neutral-800 dark:bg-blue-900/20 md:block"
                >
                    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950" />
                </motion.div>

                {/* Mobile Calendar (Small) */}
                <motion.div
                    style={{ x: mobileX, opacity: mobileOpacity }}
                    className="absolute -bottom-12 -right-4 z-10 aspect-[1/1.5] w-48 rounded-xl border-4 border-neutral-200 bg-blue-200 shadow-xl dark:border-neutral-800 dark:bg-blue-800 md:hidden"
                />
            </div>
        </section>
    );
}

function CardsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    // Fan out effect
    const rotate1 = useTransform(scrollYProgress, [0.2, 1], [-45, -15]);
    const rotate2 = useTransform(scrollYProgress, [0.2, 1], [-45, -5]);
    const rotate3 = useTransform(scrollYProgress, [0.2, 1], [-45, 5]);
    const rotate4 = useTransform(scrollYProgress, [0.2, 1], [-45, 15]);

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section ref={containerRef} className="container mx-auto grid gap-12 px-4 py-24 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Enrich your product page
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    Look at those cards. They animate in from the bottom and with some
                    magic they also rotate. Isn't that amazing?
                </p>
            </div>

            <div className="relative flex h-[400px] items-center justify-center">
                <div className="relative h-64 w-48">
                    {[rotate1, rotate2, rotate3, rotate4].map((rotation, i) => (
                        <motion.div
                            key={i}
                            style={{ rotate: rotation, y, opacity }}
                            className="absolute inset-0 origin-bottom rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                        >
                            <div className="h-full w-full rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImageShapeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    // Approximate the shape morph with clip-path inset/polygon
    // Since complex shape() isn't fully supported in all browsers/framer yet, we'll use a dynamic clip-path
    const clipPath = useTransform(
        scrollYProgress,
        [0.2, 0.8],
        [
            "polygon(10% 0%, 90% 0%, 90% 100%, 10% 100%)", // Narrow
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full
        ]
    );

    const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1]);

    return (
        <section ref={containerRef} className="container mx-auto grid gap-12 px-4 py-24 md:grid-cols-2">
            <div className="order-2 flex flex-col justify-center space-y-6 md:order-1">
                <motion.div
                    style={{ clipPath, scale }}
                    className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                        Awesome Image
                    </div>
                </motion.div>
            </div>

            <div className="order-1 flex flex-col justify-center space-y-6 md:order-2">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Animate anything
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    Using <code>clip-path</code> or standard transforms. It has stages, animating from one to the other using scroll progress.
                </p>
            </div>
        </section>
    );
}

function SpinnerSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
    const rotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 360]);

    return (
        <section ref={containerRef} className="container mx-auto grid gap-12 px-4 py-24 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Animate custom properties
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    Leverage the usage of SVG paths and Framer Motion to animate progress bound to the scroll timeline.
                </p>
            </div>

            <div className="flex items-center justify-center">
                <div className="relative h-40 w-40">
                    {/* Background Circle */}
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="fill-none stroke-neutral-200 stroke-[8] dark:stroke-neutral-800"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            style={{ pathLength, rotate }}
                            className="fill-none stroke-purple-600 stroke-[8]"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-neutral-900 dark:text-white">
                        <Counter value={pathLength} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Counter({ value }: { value: MotionValue<number> }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        return value.on("change", (latest) => {
            setCount(Math.round(latest * 100));
        });
    }, [value]);

    return <span>{count}%</span>;
}

function ReviewsSection() {
    return (
        <section className="container mx-auto px-4 py-24">
            <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white">
                What people are saying
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    {
                        name: "Myself",
                        text: "This platform revolutionized our workflow! What took 3-4 hours now takes 30 minutes.",
                    },
                    {
                        name: "Marcus Rodriguez",
                        text: "Wow... just.. wow. After one week, I increased productivity by 400%! Pure magic.",
                    },
                    {
                        name: "Jennifer Park",
                        text: "This product stripped away my artistic mystique and replaced it with boring competence.",
                    },
                ].map((review, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        className="rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900"
                    >
                        <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                            {review.name}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            {review.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default function ScrollShowcase() {
    return (
        <div className="w-full overflow-hidden bg-white dark:bg-black">
            <Hero />
            <div className="space-y-12 pb-24">
                <CalendarSection />
                <CardsSection />
                <ImageShapeSection />
                <SpinnerSection />
                <ReviewsSection />
            </div>
            <footer className="h-[50vh] flex items-center justify-center text-neutral-400">
                Footer Content
            </footer>
        </div>
    );
}
