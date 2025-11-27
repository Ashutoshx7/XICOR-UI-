'use client';

import { Navbar } from "@/components/navbar";
import InteractiveBook, { BookPage } from "@/components/ui/interactive-book";
import { Twitter } from "lucide-react";
import ConfettiButton from "@/components/ui/confetti-button";

const portfolioPages: BookPage[] = [
  {
    pageNumber: 1,
    title: "The Awakening",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-xl font-serif font-bold text-neutral-900 mb-6">
          "Look at me."
        </p>
        <p className="text-lg font-serif text-neutral-800 leading-relaxed italic">
          "Look at my GitHub. The developer inside of me has grown this large."
        </p>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-sm font-light text-neutral-600 leading-relaxed">
          We are all born without a stack. But I... I have consumed them all. Frontend. Backend. The void between divs.
        </p>
      </div>
    )
  },
  {
    pageNumber: 2,
    title: "The Perfect UI",
    content: (
      <div className="flex flex-col justify-center h-full text-center">
        <p className="text-md font-serif text-neutral-800 leading-loose">
          "There is no such thing as a perfect interface. That is why users find themselves drawn to my designs."
        </p>
        <div className="mt-6 w-full h-[1px] bg-neutral-300" />
        <p className="mt-6 text-sm font-sans font-bold uppercase tracking-widest text-neutral-500">
          UI / UX & Frontend
        </p>
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-center h-full text-center px-6">
        <p className="text-sm font-serif italic text-neutral-500 mb-4">
          I manipulate the DOM like a puppet master.
        </p>
        <p className="text-xs text-neutral-400">
          React. Next.js. Tailwind. Framer Motion.
        </p>
      </div>
    )
  },
  {
    pageNumber: 3,
    title: "The Ghost in the Machine",
    content: (
      <div className="flex flex-col justify-center h-full text-center">
        <p className="text-md font-serif text-neutral-800 leading-loose">
          "I created an agent. It has no name. But it writes code better than your senior engineer."
        </p>
        <p className="mt-8 text-sm font-sans font-bold uppercase tracking-widest text-neutral-500">
          Backend & AI Agents
        </p>
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-center h-full text-center px-4">
        <p className="text-lg font-serif font-bold text-neutral-900 mb-2">
          "I build the brains."
        </p>
        <p className="text-sm font-serif text-neutral-600">
          Systems that think, so you don't have to.
        </p>
      </div>
    )
  },
  {
    pageNumber: 4,
    title: "The Choice",
    content: (
      <div className="flex flex-col justify-center h-full pt-4 text-center">
        <p className="mb-6 text-lg font-serif text-neutral-900 font-bold">
          "Why follow me?"
        </p>
        <p className="text-sm font-serif text-neutral-700 leading-relaxed">
          Because in a world of chaos and broken builds, I bring... slightly structured chaos.
        </p>
        <p className="mt-4 text-sm font-serif text-neutral-700 leading-relaxed">
          If you don't, you'll never know what I build next. And that uncertainty... that is true fear.
        </p>
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-center h-full text-center px-4">
        <p className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-2">
          Do not look away.
        </p>
        <div className="w-full h-32 bg-neutral-100 rounded-sm flex items-center justify-center overflow-hidden grayscale opacity-50">
          <div className="w-16 h-16 border-4 border-neutral-800 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-neutral-800 rounded-full" />
          </div>
        </div>
      </div>
    )
  },
  {
    pageNumber: 5,
    title: "The End?",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-2xl font-serif font-bold text-neutral-900 mb-6 tracking-widest">
          FOLLOW ME
        </p>
        <a
          href="https://x.com/Ashutosh_7x7"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-lg"
        >
          <Twitter size={18} />
          <span className="font-sans text-sm font-medium tracking-wide">@Ashutosh_7x7</span>
        </a>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-xs text-neutral-400 mb-4">End of Portfolio</p>
        <div className="w-8 h-8 border border-neutral-300 rotate-45" />
      </div>
    )
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e0e0e0] dark:bg-[#0a0a0a] text-foreground transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-20">
        <InteractiveBook
          // Moody, dark, Johan-esque aesthetic
          coverImage="/johan-cover.jpg"
          bookTitle="Why You Should Follow Me"
          bookAuthor="A Monster Dev"
          pages={portfolioPages}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 pb-20">
        <ConfettiButton>Confirm</ConfettiButton>
        <ConfettiButton variant="white">Confirm</ConfettiButton>
        <ConfettiButton variant="grey">Confirm</ConfettiButton>
      </div>
    </main>
  );
}