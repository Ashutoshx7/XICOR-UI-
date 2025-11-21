"use client"

import { ArrowUpRight, Home, User, Calendar, Zap, CreditCard, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

type NavbarProps = {
  leftItems?: NavItem[]
  rightItems?: NavItem[]
  logoSrc?: string
  logoAlt?: string
  logo?: ReactNode
  className?: string
}

const defaultLeft: NavItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Events", href: "#events", icon: Calendar }
]

const defaultRight: NavItem[] = [
  { label: "Sponsors", href: "#sponsors", icon: Zap },
  { label: "Pricing", href: "#pricing", icon: CreditCard },
]

export function Navbar({
  leftItems = defaultLeft,
  rightItems = defaultRight,
  logoSrc,
  logoAlt = "Brand logo",
  logo,
  className
}: NavbarProps) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <div className="relative w-full h-16">
        {/* Left Bar */}
        <div 
          className="absolute top-0 left-0 h-10 bg-white/5 backdrop-blur-xl z-20" 
          style={{ width: 'calc(50% - 350px)' }} 
        >
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="absolute bottom-[3px] left-0 right-0 h-px bg-white/5" />
        </div>
        
        {/* Right Bar */}
        <div 
          className="absolute top-0 right-0 h-10 bg-white/5 backdrop-blur-xl z-20" 
          style={{ width: 'calc(50% - 350px)' }} 
        >
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="absolute bottom-[3px] left-0 right-0 h-px bg-white/5" />
        </div>

        {/* Center Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-16 z-10">
           {/* The Shape */}
           <div 
             className="absolute inset-0 bg-white/5 backdrop-blur-xl"
             style={{
               clipPath: "path('M0 0 H700 V40 C675 40 675 64 650 64 H50 C25 64 25 40 0 40 V0 Z')",
             }} 
           />
           {/* Border Stroke */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 700 64">
              {/* Main Stroke */}
              <path 
                d="M0 39.5 C25 39.5 25 63.5 50 63.5 H650 C675 63.5 675 39.5 700 39.5" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="1" 
              />
              {/* Offset Stroke */}
              <path 
                d="M0 36.5 C25 36.5 25 60.5 50 60.5 H650 C675 60.5 675 36.5 700 36.5" 
                fill="none" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="1" 
              />
           </svg>
           
           {/* Content */}
           <div className="relative h-full flex items-end justify-center pb-1 px-8">
            <div className="flex items-center justify-between w-full">
                <nav className="flex items-center gap-4">
                {leftItems.map(item => (
                    <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap"
                    >
                    <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                    </Link>
                ))}
                </nav>

                <div className="flex items-center justify-center shrink-0 mx-4 -mt-1">
                {logo ? (
                    logo
                ) : logoSrc ? (
                    <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={80}
                    height={40}
                    className="h-8 w-auto object-contain"
                    priority
                    />
                ) : (
                    <div className="relative group cursor-pointer">
                    <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-lg group-hover:bg-blue-500/20 transition-all duration-500" />
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-100 text-blue-600 shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    </div>
                )}
                </div>

                <nav className="flex items-center gap-4">
                {rightItems.map(item => (
                    <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap"
                    >
                    <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                    </Link>
                ))}
                
                {/* Auth Buttons */}
                <div className="flex items-center gap-2 pl-4 border-l border-white/10 shrink-0">
                    <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap">
                        Log in
                    </Link>
                    <Link href="/signup" className="px-3 py-1.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors shadow-sm shadow-white/10 whitespace-nowrap">
                        Sign up
                    </Link>
                </div>
                </nav>
            </div>
           </div>
        </div>
      </div>
    </header>
  )
}

