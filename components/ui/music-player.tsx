import React from "react"
import { cn } from "@/lib/utils"
import { Play, SkipBack, SkipForward, Repeat, Shuffle, ListMusic, Volume2 } from "lucide-react"

interface MusicPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    imageSrc?: string
    songTitle?: string
    artistName?: string
}

export function MusicPlayer({
    className,
    imageSrc = "https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
    songTitle = "Queenie Eye",
    artistName = "Paul McCartney — New",
    ...props
}: MusicPlayerProps) {
    return (
        <div
            className={cn(
                "relative w-[400px] h-[400px] overflow-hidden rounded-[30px] shadow-[0_2px_4px_-4px_rgba(0,0,0,0.4),0_50px_45px_-20px_rgba(0,0,0,0.2)] bg-white",
                className
            )}
            {...props}
        >
            {/* Meta */}
            <div className="absolute top-0 z-10 w-full px-5 py-[50px] text-center text-white/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                <div className="text-2xl font-medium tracking-wide">{songTitle}</div>
                <div className="text-base font-light opacity-80 mt-1">{artistName}</div>
            </div>

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-bottom transition-all duration-500"
                style={{ backgroundImage: `url(${imageSrc})` }}
            >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black to-white opacity-20 mix-blend-soft-light" />
            </div>

            {/* Top Icons */}
            <button className="absolute top-[30px] left-5 z-20 text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
                <ListMusic className="w-6 h-6" />
            </button>
            <button className="absolute top-[30px] right-5 z-20 text-white/80 hover:text-white transition-colors ">
                <Volume2 className="w-6 h-6" />
            </button>

            {/* Controls Container */}
            <div className="absolute bottom-0 h-20 w-full bg-white/20 shadow-[inset_0_1px_rgba(255,255,255,0.3)] z-20">
                {/* Controls Background (Blurred) */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-bottom blur-[30px]"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-white opacity-[0.08] mix-blend-soft-light" />
                    </div>
                </div>

                {/* Controls UI */}
                <div className="relative h-full w-full flex items-center justify-center">
                    {/* Repeat */}
                    <button className="absolute left-5 text-[#1A0C1D] hover:text-black transition-colors">
                        <Repeat className="w-5 h-5" />
                    </button>

                    {/* Prev */}
                    <button className="group absolute left-[120px] w-10 h-10 rounded-full bg-white/1 shadow-[0_-2px_4px_0_rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[radial-gradient(ellipse_at_center,rgba(12,11,23,0.4)_0%,rgba(86,76,132,0.1)_60%,rgba(255,255,255,0.2)_100%)] transition-all duration-150">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-white/5 mix-blend-overlay shadow-[0_-1px_1px_0_rgba(255,255,255,0.6)]" />
                        <div className="absolute inset-0 rounded-full shadow-[0_5px_10px_0_rgba(0,0,0,0.6)] mix-blend-soft-light" />
                        <SkipBack className="w-5 h-5 text-black/80 fill-current drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-50 group-hover:scale-90 relative z-10" />
                    </button>

                    {/* Play */}
                    <button className="group relative w-[60px] h-[60px] rounded-full bg-white/1 shadow-[0_-2px_4px_0_rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[radial-gradient(ellipse_at_center,rgba(12,11,23,0.4)_0%,rgba(86,76,132,0.1)_60%,rgba(255,255,255,0.2)_100%)] transition-all duration-150 mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-white/5 mix-blend-overlay shadow-[0_-1px_1px_0_rgba(255,255,255,0.6)]" />
                        <div className="absolute inset-0 rounded-full shadow-[0_5px_10px_0_rgba(0,0,0,0.6)] mix-blend-soft-light" />
                        <Play className="w-[30px] h-[30px] text-black/80 fill-current drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-50 group-hover:scale-90 relative z-10 ml-1" />
                    </button>

                    {/* Next */}
                    <button className="group absolute right-[120px] w-10 h-10 rounded-full bg-white/1 shadow-[0_-2px_4px_0_rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[radial-gradient(ellipse_at_center,rgba(12,11,23,0.4)_0%,rgba(86,76,132,0.1)_60%,rgba(255,255,255,0.2)_100%)] transition-all duration-150">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-white/5 mix-blend-overlay shadow-[0_-1px_1px_0_rgba(255,255,255,0.6)]" />
                        <div className="absolute inset-0 rounded-full shadow-[0_5px_10px_0_rgba(0,0,0,0.6)] mix-blend-soft-light" />
                        <SkipForward className="w-5 h-5 text-black/80 fill-current drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-50 group-hover:scale-90 relative z-10" />
                    </button>

                    {/* Shuffle */}
                    <button className="absolute right-5 text-[#1A0C1D] hover:text-black transition-colors">
                        <Shuffle className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
