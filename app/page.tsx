"use client"
import { Navbar } from "@/components/navbar"
import { MaskedAvatars } from "@/components/ui/MaskedAvatars"
import { InfiniteScrollIcons } from "@/components/ui/InfiniteScrollIcons"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="flex flex-col items-center pt-32 gap-10p mb-20">
        <Navbar />

      </div>
      <MaskedAvatars className=" flex flex-col items-center  align-" />
      <div className="mt-20 w-full">
        <InfiniteScrollIcons speed={30} />
      </div>
    </main>
  )
}