"use client"
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar"
import { MaskedAvatars } from "@/components/ui/MaskedAvatars"

export default function Home() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="flex flex-col items-center pt-32 gap-10 mb-20">
        <SpotlightNavbar items={navItems} />
      </div>
      <MaskedAvatars className="flex flex-col items-center" />
    </main>
  )
}