'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useId,
  RefObject,
  CSSProperties,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, Slack, Twitter } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Simple outside-click hook
function useOutsideClick(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, handler])
}

interface StaggeredGridProps {
  images: string[]
  centerText?: string
  credits?: {
    madeBy: { text: string; href: string }
    moreDemos: { text: string; href: string }
  }
  className?: string
}

const defaultBentoItems = [
  {
    id: 1,
    title: 'GitHub',
    subtitle: 'Version Control',
    description: "The world's leading software development platform.",
    icon: <Github className="h-8 w-8 md:h-10 md:w-10" />,
    content: (
      <div className="space-y-2 text-sm">
        <p>Host your code, collaborate with others, and ship software faster.</p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Slack',
    subtitle: 'Team Communication',
    description: 'Slack is a new way to communicate with your team.',
    icon: <Slack className="h-8 w-8 md:h-10 md:w-10" />,
    content: (
      <div className="space-y-2 text-sm">
        <p>Channels, huddles, and integrations to keep everyone aligned.</p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Twitter',
    subtitle: 'Social Network',
    description: 'Connect with the world.',
    icon: <Twitter className="h-8 w-8 md:h-10 md:w-10" />,
    content: (
      <div className="space-y-4 text-sm">
        <p>
          X (formerly Twitter) is what’s happening and what people are talking
          about right now.
        </p>
      </div>
    ),
  },
] as const

type BentoItem = (typeof defaultBentoItems)[number]

export default function StaggeredGrid({
  images,
  centerText = 'Halcyon',
  credits = {
    madeBy: { text: '@codrops', href: 'https://x.com/codrops' },
    moreDemos: { text: 'More demos', href: 'https://tympanus.net/codrops/demos' },
  },
  className,
}: StaggeredGridProps) {
  const gridFullRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bentoCardRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<BentoItem | null>(null)
  const id = useId()

  useOutsideClick(bentoCardRef, () => {
    if (active) setActive(null)
  })

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: 'transform' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  // Prepare grid items: 35 total (7 x 5), inject 3 bento cards at indices 30–32
  const mixedGridItems: (string | BentoItem)[] = React.useMemo(() => {
    const base: (string | BentoItem)[] = [...images]

    // Repeat images until we have at least 35
    while (base.length < 35) {
      base.push(...images)
      if (images.length === 0) break
    }

    const slice = base.slice(0, 35)

    if (defaultBentoItems.length >= 3 && slice.length >= 33) {
      slice[30] = defaultBentoItems[0]
      slice[31] = defaultBentoItems[1]
      slice[32] = defaultBentoItems[2]
    }

    return slice
  }, [images])

  // GSAP animations
  useEffect(() => {
    if (!gridFullRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.grid__item')
      items.forEach((item) => {
        const img = item.querySelector<HTMLElement>('.grid__item-img')
        if (!img) return

        // A light 3D scroll effect
        gsap.fromTo(
          img,
          {
            rotateX: -15,
            rotateY: 15,
            y: 80,
            opacity: 0,
          },
          {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=20%',
              end: 'top center',
              scrub: true,
            },
          }
        )
      })

      // Center text subtle movement
      const textChars = textRef.current?.querySelectorAll('.char') ?? []
      if (textChars.length) {
        gsap.fromTo(
          textChars,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top bottom',
              end: 'top center',
              scrub: true,
            },
          }
        )
      }

      // Credits stagger
      const creditsEls = gsap.utils.toArray<HTMLElement>('.credits')
      creditsEls.forEach((credit) => {
        const chars = credit.querySelectorAll('.char')
        gsap.timeline({
          scrollTrigger: {
            trigger: credit,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }).fromTo(
          chars,
          {
            x: (index: number) => index * 80 - ((chars.length * 80) / 2),
          },
          {
            x: 0,
            ease: 'sine.inOut',
          }
        )
      })
    }, gridFullRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      className={cn('shadow relative overflow-hidden w-full', className)}
      style={{ '--grid-item-translate': '0px' } as CSSProperties}
    >
      {/* Frame / header */}
      <div className="frame uppercase text-[13px] relative p-6 grid w-full gap-6 z-[6000] grid-cols-3 [grid-template-areas:'back_archive_github'] md:[grid-template-columns:auto_auto_auto_1fr] md:[grid-template-areas:'back_archive_github_sponsor']">
        <a
          className="frame__back [grid-area:back]"
          href="https://tympanus.net/codrops/?p=81462"
          target="_blank"
          rel="noreferrer"
        >
          Article
        </a>
        <a
          className="frame__archive [grid-area:archive]"
          href="https://tympanus.net/codrops/demos"
          target="_blank"
          rel="noreferrer"
        >
          All demos
        </a>
        <a
          className="frame__github [grid-area:github]"
          href="https://github.com/codrops/Staggered3DGridAnimations"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      {/* Center text */}
      <section className="grid place-items-center w-full relative mt-[20vh]">
        <div
          ref={textRef}
          className="text font-alt uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7]"
        >
          {splitText(centerText)}
        </div>
      </section>

      {/* Grid */}
      <section className="grid place-items-center w-full relative">
        <div
          ref={gridFullRef}
          className="grid--full w-full my-[10vh] h-auto aspect-[1.5] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5"
        >
          {mixedGridItems.map((item, i) => {
            if (typeof item === 'string') {
              return (
                <figure
                  key={`img-${i}`}
                  className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity]"
                >
                  <div
                    className="grid__item-img w-full h-full bg-cover bg-[50%_20%] [backface-visibility:hidden] will-change-transform"
                    style={{ backgroundImage: `url(${item})` }}
                  />
                </figure>
              )
            }

            return (
              <motion.figure
                layoutId={`card-${item.title}-${id}`}
                key={`bento-${item.id}`}
                onClick={() => setActive(item)}
                className="grid__item bento-item m-0 relative z-20 [perspective:800px] cursor-pointer group"
              >
                <div className="grid__item-img w-full h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  <motion.div
                    layoutId={`image-${item.title}-${id}`}
                    className="mb-2"
                  >
                    <div className="text-neutral-800 dark:text-neutral-200 scale-75 group-hover:scale-90 transition-transform">
                      {item.icon}
                    </div>
                  </motion.div>
                  <motion.h3
                    layoutId={`title-${item.title}-${id}`}
                    className="text-[10px] md:text-xs font-bold text-neutral-800 dark:text-neutral-200 text-center uppercase font-alt"
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </motion.figure>
            )
          })}
        </div>
      </section>

      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-[10000]"
          />
        )}
      </AnimatePresence>

      {/* Bento modal */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[10001] pointer-events-none">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={bentoCardRef}
              className="w-full max-w-[500px] h-fit max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden pointer-events-auto shadow-2xl relative"
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-4 right-4 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full z-20"
                onClick={() => setActive(null)}
              >
                <X className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
              </motion.button>

              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="w-full h-60 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
              >
                <div className="scale-[2] text-neutral-800 dark:text-neutral-200">
                  {active.icon}
                </div>
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.title}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {active.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Credits */}
      <p className="credits font-alt text-[clamp(1rem,5vw,3rem)] uppercase text-center mt-[50vh] mb-0 pb-[10vh]">
        {splitText('Made by ')}{' '}
        <a href={credits.madeBy.href} target="_blank" rel="noreferrer">
          {splitText(credits.madeBy.text)}
        </a>
      </p>
      <p className="credits font-alt text-[clamp(1rem,5vw,3rem)] uppercase text-center mt-0 pb-[10vh]">
        <a href={credits.moreDemos.href} target="_blank" rel="noreferrer">
          {splitText(credits.moreDemos.text)}
        </a>
      </p>
    </div>
  )
}
