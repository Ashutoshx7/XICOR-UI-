"use client"
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar"
import { MaskedAvatars } from "@/components/ui/MaskedAvatars"
import { Navbar } from "@/components/navbar"
import Glassdock from "@/components/ui/glassdock"
import Ahole from "@/components/ui/AHole";
import ShinyCta from "@/components/ui/ShinyCta";
import {LoadingText} from "@/components/ui/loading-text";
import WaveReveal from "@/components/ui/WaveReveal"
import Flame from "@/components/Flame";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar></Navbar>
      

      <div className="flex flex-col items-center pt-32 gap-10 mb-20">
        <SpotlightNavbar />
        
                <LoadingText />
                <MaskedAvatars></MaskedAvatars>
                <ShinyCta>Get started</ShinyCta>
                

      </div>


    </main>
  )
}