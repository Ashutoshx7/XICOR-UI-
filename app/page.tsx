'use client';

import { Navbar } from "@/components/navbar";
import InteractiveBook, { BookPage } from "@/components/ui/interactive-book";
import { Twitter } from "lucide-react";
import ConfettiButton from "@/components/ui/confetti-button";
import { LogoSlider } from "@/components/ui/logo-slider";

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

      {/* Logo Slider Showcase */}
      <section className="w-full space-y-8 pb-20">
        <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Logo Slider
          </h2>
          <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl dark:text-neutral-400">
            A seamless infinite scrolling logo slider with blur effects.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <LogoSlider
            speed={40}
            direction="left"
            logos={[
              <svg key="1" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C24.002 5.375 18.632.002 12.007 0H12zm7.327 18.065s-.581-2.627-1.528-4.197c-.514-.857-1.308-1.553-2.368-1.532-.745 0-1.399.423-2.2 1.553-.469.77-.882 1.573-1.235 2.403 0 0-.29-.675-.63-1.343a8.038 8.038 0 0 0-.605-1.049c-.804-1.13-1.455-1.539-2.2-1.553-1.049-.021-1.854.675-2.364 1.528-.948 1.574-1.528 4.197-1.528 4.197h-.864l4.606-15.12 3.56 11.804.024.021.024-.021 3.56-11.804 4.61 15.113h-.862z" /></svg>,
              <svg key="2" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>,
              <svg key="3" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" /></svg>,
              <svg key="4" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z" /></svg>,
              <svg key="5" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
              <svg key="6" viewBox="0 0 24 24" className="h-8 w-auto fill-neutral-800 dark:fill-neutral-200"><path d="M12.0069 24h-.3572l2.459-6.7453h3.3796c.5907 0 1.2364-.4533 1.4424-1.0166l2.6652-7.3085c.4396-1.1952-.2473-2.1706-1.525-2.1706h-4.6983l-3.929 10.798-2.2255 6.127C3.929 22.434 0 17.6806 0 12.007 0 6.498 3.7092 1.8546 8.7647.4396L6.4705 6.759 2.6514 17.2547h2.5415L8.4488 8.339h1.9095l-3.2558 8.9158H9.644l3.0223-8.3251c.4396-1.1952-.2473-2.1706-1.525-2.1706h-2.143l2.459-6.7453C11.636 0 11.8145 0 11.9931 0 18.6285 0 24 5.3715 24 12.007c.0137 6.6216-5.3578 11.993-11.9931 11.993zM19.2742 8.325h-1.9096l-2.6789 7.336h1.9096l2.6789-7.336z" /></svg>,
            ]}
          />
        </div>
      </section>
    </main>
  );
}