'use client';

import { Navbar } from "@/components/navbar";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { FlipText } from "@/components/ui/flip-text";
import ConfettiButton from "@/components/ui/confetti-button";
import { SmokeText } from "@/components/ui/smoke-text";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0">
          <PerspectiveGrid className="w-full h-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 p-4 text-center">
          <div className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-900 dark:text-neutral-100">
            <FlipText>EVERYBODY CAN COOK</FlipText>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A collection of high-quality, interactive UI components built with React, Tailwind CSS, and Framer Motion.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <ConfettiButton>Get Started</ConfettiButton>
            <ConfettiButton variant="white">Documentation</ConfettiButton>
            <div className="px-4 py-2">
              <SmokeText texts={["  Karn", "Artist", "Engineer"]} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}