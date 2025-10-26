"use client"
import AnimatedButton from "@/components/ui/AnimatedButton"; // Import your animated button
import ThemeToggle from "@/components/ui/ThemeToggle"; // Import ThemeToggle for light/dark mode

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Top-right theme toggle for testing */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <AnimatedButton />
    </div>
  )
}