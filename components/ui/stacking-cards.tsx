"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardItem {
    id: number | string;
    title: string;
    description: string;
    content?: React.ReactNode;
    className?: string;
}

interface CardProps {
    i: number;
    item: CardItem;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card = ({ i, item, progress, range, targetScale }: CardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="h-screen flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(-10vh + ${i * 25}px)`,
                }}
                className={cn(
                    "flex flex-col relative -top-[25%] h-[450px] w-full max-w-5xl rounded-3xl p-8 origin-top border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl",
                    item.className
                )}
            >
                <div className="flex flex-col h-full justify-between">
                    <header>
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                            {item.title}
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                            {item.description}
                        </p>
                    </header>

                    <div className="flex-1 mt-8 relative rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-100 dark:border-neutral-800 p-6 flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                            {item.content}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const StackingCards = ({ items }: { items: CardItem[] }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={container} className="mt-[25vh] mb-[50vh]">
            {items.map((item, i) => {
                const targetScale = 1 - (items.length - i) * 0.05;
                return (
                    <Card
                        key={item.id}
                        i={i}
                        item={item}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};
