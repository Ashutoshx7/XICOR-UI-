'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, RefreshCcw, X, BookOpen } from 'lucide-react';

export interface BookPage {
    title?: string;
    content: React.ReactNode;
    backContent?: React.ReactNode;
    pageNumber: number;
}

export interface InteractiveBookProps {
    coverImage: string;
    bookTitle?: string;
    bookAuthor?: string;
    pages: BookPage[];
    className?: string;
    width?: number | string;
    height?: number | string;
}

export default function InteractiveBook({
    coverImage,
    bookTitle = "Book Title",
    bookAuthor = "Author Name",
    pages,
    className,
    width = 350,
    height = 500,
}: InteractiveBookProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(-1);

    const handleOpenBook = () => setIsOpen(true);

    const handleCloseBook = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
        setCurrentPageIndex(-1);
    };

    const nextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex((prev) => prev + 1);
        }
    };

    const prevPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentPageIndex >= 0) {
            setCurrentPageIndex((prev) => prev - 1);
        }
    };

    const restartBook = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentPageIndex(-1);
    };

    const [isHovering, setIsHovering] = useState(false);

    // Cover Z-Index Variants
    const coverVariants = {
        closed: {
            rotateY: 0,
            zIndex: 100,
            transition: {
                rotateY: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] },
                zIndex: { delay: 0.8 }
            }
        },
        hoverClosed: {
            rotateY: -15,
            zIndex: 100,
            transition: {
                rotateY: { duration: 0.4, ease: "easeOut" },
                zIndex: { delay: 0 }
            }
        },
        open: {
            rotateY: -180,
            zIndex: 0,
            transition: {
                rotateY: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] },
                zIndex: { delay: 0.8 }
            }
        }
    };

    return (
        <div
            className={cn("relative flex items-center justify-center perspective-[2000px]", className)}
            style={{ width: typeof width === 'number' ? width * 2 + 100 : '100%', height: typeof height === 'number' ? height + 150 : 'auto' }}
        >
            <div
                className={cn(
                    "relative preserve-3d transition-transform duration-1000 ease-in-out",
                    isOpen ? "translate-x-[50%]" : ""
                )}
                style={{ width, height }}
            >

                {/* Front Cover */}
                <motion.div
                    className="absolute inset-0 w-full h-full origin-left"
                    initial="closed"
                    animate={isOpen ? "open" : (isHovering ? "hoverClosed" : "closed")}
                    variants={coverVariants}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={!isOpen ? handleOpenBook : undefined}
                    onHoverStart={() => !isOpen && setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                >
                    {/* Front Face */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-r-md rounded-l-sm shadow-2xl cursor-pointer overflow-hidden group"
                        style={{ transform: 'translateZ(0.5px)' }}
                    >
                        {/* Image Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${coverImage})` }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Title & Author on Cover */}
                        <div className="absolute bottom-10 left-6 right-6 text-white">
                            <h1 className="text-3xl font-serif font-bold tracking-wide mb-2 drop-shadow-lg">{bookTitle}</h1>
                            <p className="text-sm font-sans tracking-widest opacity-90 uppercase">{bookAuthor}</p>
                        </div>

                        {/* Spine Highlight */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent opacity-40" />
                        <div className="absolute left-[12px] top-0 bottom-0 w-[1px] bg-black/30" />
                    </div>

                    {/* Back Face (Inner Left) */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-l-md rounded-r-sm bg-[#fdfbf7] rotate-y-180 flex flex-col p-8 border-r border-neutral-200 shadow-md"
                        style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                    >
                        <div className="flex-1 flex flex-col justify-center items-center text-center opacity-80">
                            <h2 className="text-2xl font-serif text-neutral-800 mb-2 tracking-wide">{bookTitle}</h2>
                            <div className="w-8 h-[1px] bg-neutral-300 mb-3" />
                            <p className="text-xs text-neutral-500 uppercase tracking-widest">Interactive Edition</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleCloseBook}
                            className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-neutral-800 transition-colors"
                            title="Close Book"
                        >
                            <X size={18} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Pages Stack */}
                <div className="absolute inset-0 w-full h-full z-0" style={{ transformStyle: 'preserve-3d' }}>
                    {pages.map((page, index) => {
                        const isFlipped = index <= currentPageIndex;
                        const isBuriedLeft = index < currentPageIndex; // Page is on left but covered by another page

                        const variants = {
                            flipped: {
                                rotateY: -180,
                                zIndex: index + 1,
                                opacity: isBuriedLeft ? 0 : 1,
                                transition: {
                                    rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] },
                                    zIndex: { delay: 0.6 },
                                    opacity: { delay: 0.5, duration: 0.4, ease: "easeOut" }
                                }
                            },
                            unflipped: {
                                rotateY: 0,
                                zIndex: pages.length - index,
                                opacity: 1,
                                transition: {
                                    rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] },
                                    zIndex: { delay: 0 },
                                    opacity: { delay: 0, duration: 0.2 }
                                }
                            }
                        };

                        return (
                            <motion.div
                                key={index}
                                className="absolute inset-0 w-full h-full origin-left bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-sm border border-neutral-100"
                                style={{ transformStyle: 'preserve-3d' }}
                                initial="unflipped"
                                animate={isOpen && isFlipped ? "flipped" : "unflipped"}
                                variants={variants}
                            >
                                {/* Front Face (Right Side) */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col bg-[#fdfbf7]"
                                    style={{ transform: 'translateZ(0.5px)' }}
                                >
                                    <div className="flex-1">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="prose prose-neutral prose-sm max-w-none font-serif text-neutral-700 leading-relaxed h-full flex flex-col"
                                        >
                                            <div className="text-xs text-neutral-400 text-right mb-6 font-sans tracking-wider">
                                                PAGE {page.pageNumber * 2 - 1}
                                            </div>
                                            {page.title && (
                                                <h3 className="text-xl font-medium text-center mb-8 text-neutral-800 tracking-tight">
                                                    {page.title}
                                                </h3>
                                            )}
                                            <div className="flex-1">
                                                {page.content}
                                            </div>
                                        </motion.div>
                                    </div>
                                    {/* Inner Spine Shadow */}
                                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/5 to-transparent pointer-events-none mix-blend-multiply" />
                                    <div className="absolute left-[1px] top-0 bottom-0 w-[1px] bg-black/10" />
                                </div>

                                {/* Back Face (Left Side) */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#fdfbf7] border-r border-neutral-200 overflow-hidden p-8 flex flex-col"
                                    style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                                >
                                    {/* Inner Spine Shadow for Back */}
                                    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/5 to-transparent pointer-events-none mix-blend-multiply" />
                                    <div className="absolute right-[1px] top-0 bottom-0 w-[1px] bg-black/10" />

                                    {/* Back Content */}
                                    <div className="flex-1 overflow-hidden">
                                        <div className="prose prose-neutral prose-sm max-w-none font-serif text-neutral-700 leading-relaxed h-full flex flex-col">
                                            <div className="text-xs text-neutral-400 text-left mb-6 font-sans tracking-wider">
                                                PAGE {page.pageNumber * 2}
                                            </div>
                                            {page.backContent ? (
                                                <div className="flex-1">
                                                    {page.backContent}
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-[0.03] select-none">
                                                    <span className="font-serif text-8xl italic font-bold text-black">
                                                        {page.pageNumber * 2}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Back Cover (Static) */}
                    <div
                        className="absolute inset-0 w-full h-full bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-xl border border-neutral-200"
                        style={{ transform: 'translateZ(-1px)', zIndex: -1 }}
                    >
                        <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center opacity-40">
                            <p className="font-serif text-neutral-500 italic">The End</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={restartBook}
                                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm text-neutral-600 z-50 cursor-pointer relative"
                            >
                                <RefreshCcw size={14} /> Read Again
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Bar */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 z-50"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevPage}
                                disabled={currentPageIndex < 0}
                                className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-neutral-700 dark:text-neutral-200"
                                title="Previous Page"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>

                            <div className="flex flex-col items-center min-w-[80px]">
                                <span className="font-serif text-sm font-medium tracking-widest text-neutral-800 dark:text-neutral-200">
                                    {currentPageIndex < 0 ? "START" : currentPageIndex >= pages.length - 1 ? "END" : `${currentPageIndex + 2} / ${pages.length + 1}`}
                                </span>
                                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                                    {currentPageIndex < 0 ? "Cover" : "Reading"}
                                </span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextPage}
                                disabled={currentPageIndex >= pages.length - 1}
                                className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-neutral-700 dark:text-neutral-200"
                                title="Next Page"
                            >
                                <ChevronRight size={20} />
                            </motion.button>

                            <div className="w-[1px] h-8 bg-neutral-200 dark:bg-neutral-700 mx-2" />

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,0,0,0.1)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleCloseBook}
                                className="p-2 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                                title="Close Book"
                            >
                                <BookOpen size={18} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Hint */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 text-neutral-400 text-sm font-light tracking-widest uppercase"
                >
                    Click to Open
                </motion.div>
            )}
        </div>
    );
}
