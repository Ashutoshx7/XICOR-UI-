"use client"

import { CheckIcon, CircleStackIcon } from "@heroicons/react/24/solid"
import Flame from "@/components/Flame"
import { useRef, useState } from "react"

const App = () => {
  const cardsRef = useRef<HTMLElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [mouseOnCard, setMouseOnCard] = useState(false)

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (cardsRef.current !== null) {
      const rect = cardsRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setCursor({ x, y })
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center ">
      <section
        ref={cardsRef}
        onMouseEnter={() => setMouseOnCard(true)}
        onMouseLeave={() => setMouseOnCard(false)}
        onMouseMove={handleMouseMove}
        className="relative flex w-[800px] h-[400px] bg-neutral-800 backdrop-blur-xl rounded-2xl border border-neutral-800 shadow-lg overflow-hidden transition-all duration-300 "
      >
        {/* Left content */}
        <div className="flex flex-col justify-between w-2/5 p-10">
          <div className="flex flex-col gap-5">
            <CircleStackIcon className="w-14 h-14 rounded-lg bg-neutral-950/70 stroke-emerald-500 p-2 shadow-inner" />
            <h1 className="font-poppins text-neutral-200 tracking-wide text-2xl font-semibold">
              Database
            </h1>
            <p className="text-neutral-500 font-poppins text-sm leading-relaxed">
              Every project is a full Postgres database, the world's most
              trusted relational database.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-poppins text-neutral-200 text-sm mt-4">
            <span className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 stroke-emerald-400" />
              <p>100% portable</p>
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 stroke-emerald-400" />
              <p>Built-in Auth with RLS</p>
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 stroke-emerald-400" />
              <p>Easy to extend</p>
            </span>
          </div>
        </div>

        {/* Right side - Flame / visual */}
        <div className="w-3/5 flex justify-center items-center">
          <Flame cursor={cursor} cardRef={cardsRef} mouseOnCard={mouseOnCard} />
        </div>
      </section>
    </main>
  )
}

export default App
