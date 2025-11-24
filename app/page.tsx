"use client"
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar"
import { MaskedAvatars } from "@/components/ui/MaskedAvatars"
import { Navbar } from "@/components/navbar"
import Glassdock from "@/components/ui/glassdock"
import Ahole from "@/components/ui/AHole";
import { LoadingText } from "@/components/ui/loading-text";
import WaveReveal from "@/components/ui/WaveReveal"
import Flame from "@/components/Flame";
import SpotlightText from "@/components/ui/spotlight-text"


const dropsData = [
  {
    id: "1",
    text: "Roses are red",
    x: "-1.55em",
    y: "-3.73em",
  },
  {
    id: "2",
    text: "Violets are blue",
    x: "-1.5em",
    y: "-1.8em",
  },
  {
    id: "3",
    text: 'Unexpected ";"',
    x: "1.5em",
    y: "1.8em",
  },
  {
    id: "4",
    text: "On line 32",
    x: "1.3em",
    y: "3.7em",
  },
]

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
        
        
        </div>
      
    </main>
  )
}