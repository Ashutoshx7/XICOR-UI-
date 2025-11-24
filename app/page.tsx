"use client"
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar"
import { MaskedAvatars } from "@/components/ui/MaskedAvatars"
import { Navbar } from "@/components/navbar"
import Glassdock from "@/components/ui/glassdock"
import { LoadingText } from "@/components/ui/loading-text";
import AHole from "@/components/ui/AHole";
// Removed unused imports




export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar></Navbar>
        C

      <div className="flex flex-col items-center pt-32 gap-10 mb-20">
        <SpotlightNavbar />

        <LoadingText />
        <MaskedAvatars></MaskedAvatars>
        <Glassdock></Glassdock>
        <AHole></AHole>
        
        
        </div>
      
    </main>
  )
}