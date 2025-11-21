"use client"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div>
        <Navbar />
      </div>
    </main>
  )
}