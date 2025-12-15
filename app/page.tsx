'use client';
'use client';

import { Navbar } from "@/components/navbar";
import ImageTrail from "@/components/ui/imagetrail"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
        {/* Background Grid */}
        
        
        <ImageTrail></ImageTrail>
        {/* Hero Content */}
        
      
      </section>
    </main>
  );
}