'use client';
'use client';

import { Navbar } from "@/components/navbar";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { FlipText } from "@/components/ui/flip-text";
import ConfettiButton from "@/components/ui/confetti-button";
import { SmokeText } from "@/components/ui/smoke-text";
import { GridCard } from "@/components/ui/grid-card";
import { Box, Lock, Search, Settings, Smartphone, Zap, Globe, Layout } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0">
          <PerspectiveGrid className="w-full h-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 p-4 text-center w-full max-w-6xl">
          <div className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-900 dark:text-neutral-100">
            <FlipText>EVERYBODY CAN COOK</FlipText>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A collection of high-quality, interactive UI components built with React, Tailwind CSS, and Framer Motion.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
            <ConfettiButton>Get Started</ConfettiButton>
            <ConfettiButton variant="white">Documentation</ConfettiButton>
            <div className="px-4 py-2">
              <SmokeText texts={["  Karn", "Artist", "Engineer"]} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto mt-12">
            <GridCard
              title="Secure by Default"
              description="Enterprise-grade security built into every component. We utilize state-of-the-art encryption standards."
              icon={<Lock className="w-6 h-6" />}
            />
            <GridCard
              title="Lightning Fast"
              description="Optimized for speed and performance with zero latency. Experience buttery smooth 60fps animations."
              icon={<Box className="w-6 h-6" />}
            />
            <GridCard
              title="Global Search"
              description="Powerful search capabilities designed to help you find exactly what you need in milliseconds."
              icon={<Search className="w-6 h-6" />}
            />
            <GridCard
              title="Customizable"
              description="Fully themable and adaptable to your brand identity. Change colors, fonts, and spacing easily."
              icon={<Settings className="w-6 h-6" />}
            />
            <GridCard
              title="Responsive Design"
              description="Looks perfect on any device, from mobile phones to large desktop screens."
              icon={<Smartphone className="w-6 h-6" />}
            />
            <GridCard
              title="Real-time Sync"
              description="Data stays in sync across all connected clients instantly using modern WebSocket infrastructure."
              icon={<Zap className="w-6 h-6" />}
            />
            <GridCard
              title="Internationalization"
              description="Built-in support for multiple languages and locales to reach a global audience."
              icon={<Globe className="w-6 h-6" />}
            />
            <GridCard
              title="Developer Experience"
              description="Top-tier developer tools and documentation with typed APIs and hot reloading."
              icon={<Layout className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}