"use client"
import Link from "next/link"
import { ArrowUpRight, Home, User, Calendar, Zap, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <Link href={href} className="group flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
    <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </Link>
)

export function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const items = {
    left: [{ label: "Home", href: "#home", icon: Home }, { label: "About", href: "#about", icon: User }, { label: "Events", href: "#events", icon: Calendar }],
    right: [{ label: "Sponsors", href: "#sponsors", icon: Zap }, { label: "Pricing", href: "#pricing", icon: CreditCard }]
  }

  return (
    <header className={cn("fixed top-0 inset-x-0 z-50 h-16", className)} {...props}>
      {[0, 1].map(i => (
        <div key={i} className={cn("absolute top-0 h-10 bg-foreground/5 backdrop-blur-xl z-20", i ? "right-0" : "left-0")} style={{ width: 'calc(50% - 400px)' }}>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-16 z-10">
        <div className="absolute inset-0 bg-foreground/5 backdrop-blur-xl" style={{ clipPath: "path('M0 0 H800 V40 C775 40 775 64 750 64 H50 C25 64 25 40 0 40 V0 Z')" }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 64">
          <path d="M0 39.5 C25 39.5 25 63.5 50 63.5 H750 C775 63.5 775 39.5 800 39.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          <path d="M0 36.5 C25 36.5 25 60.5 50 60.5 H750 C775 60.5 775 36.5 800 36.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
        </svg>
        <div className="relative h-full flex items-end justify-between pb-2 px-13">
          <nav className="flex gap-8 mb-1">{items.left.map(item => <NavLink key={item.label} {...item} />)}</nav>
          <div className="flex justify-center shrink-0 mx-4 mt-1">
            {props.logo || (
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-lg group-hover:bg-blue-500/20 transition-all" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </div>
              </div>
            )}
          </div>
          <nav className="flex gap-6 items-center">
            {items.right.map(item => <NavLink key={item.label} {...item} />)}
            <div className="flex gap-6 pl-4 border-l border-foreground/10 shrink-0">
              <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap mt-[6]">Log in</Link>
              <Link href="/signup" className="px-3 py-1.5 text-sm font-medium text-background bg-foreground rounded-2xl hover:bg-foreground/90 transition-colors shadow-sm shadow-foreground/10 whitespace-nowrap ">Sign up</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

