"use client"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { Navbar } from "@/components/navbar"
import InfiniteLights from "@/components/InfiniteLights"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div  >
        <Navbar />
      </div>
      <div>
        <InfiniteLights className="w-full h-full" />
      </div>
    </main>
  )
}