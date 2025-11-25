"use client";
import { SpotlightNavbar } from "@/components/ui/SpotlightNavbar";
import { MaskedAvatars } from "@/components/ui/MaskedAvatars";
import { Navbar } from "@/components/navbar";
import Glassdock from "@/components/ui/glassdock";
import { LoadingText } from "@/components/ui/loading-text";
import { MusicPlayer } from "@/components/ui/music-player";
import SocialFlipButton from "@/components/ui/SocialFlipButton";
import AnimatedButton from "@/components/ui/AnimatedButton";
import NeuralNoiseShowcase from "@/components/ui/neural-noise";
import CreepyButton from "@/components/ui/creepy-button";
import { MeteorGrid } from "@/components/ui/meteor-shower";
import { ActivitiesWidget } from "@/components/ui/activities-widget";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar></Navbar>

      <div className="flex flex-col items-center pt-32 gap-10 mb-20">
        <SpotlightNavbar />
        <SocialFlipButton />

        <LoadingText />
        <MaskedAvatars></MaskedAvatars>
        <AnimatedButton></AnimatedButton>
        <CreepyButton className="text-lg  tracking-wider text-neutral-500" coverClassName="bg-red-500">Hello</CreepyButton>

        <MusicPlayer />

        <MeteorGrid />

        <ActivitiesWidget />

        <Glassdock></Glassdock>

      </div>
    </main>
  );
}