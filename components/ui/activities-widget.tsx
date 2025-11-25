"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Ice Catch",
    description: "It's like regular catch, but it's on ice so it's cooler literally.",
    image: "https://images.unsplash.com/photo-1723274565296-2945e2ebc306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    title: "Mud Touching",
    description: "Mud isn't going to touch itself.",
    image: "https://images.unsplash.com/photo-1607930232028-f01079639b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    title: "BMX Football",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: "https://images.unsplash.com/photo-1677757103853-a304b6a182f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    title: "Shoe Tying",
    description: "I love tying shoes. Bunny style. All the styles.",
    image: "https://images.unsplash.com/photo-1676312830459-f6f13dfdd899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export const ActivitiesWidget = () => {
  const [activeId, setActiveId] = useState(1);
  const [direction, setDirection] = useState(1);

  const activeIndex = activities.findIndex((a) => a.id === activeId);
  const activeActivity = activities[activeIndex];

  const handleNext = () => {
    if (activeIndex < activities.length - 1) {
      setDirection(1);
      setActiveId(activities[activeIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveId(activities[activeIndex - 1].id);
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="relative grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] gap-x-8 gap-y-2 max-w-[400px] w-full"
        style={{ perspective: "1400px" }}
      >
        {/* Count */}
        <div className="col-start-2 row-start-1 text-right font-mono text-sm text-neutral-500">
          {activeIndex + 1} / {activities.length}
        </div>

        {/* Image Deck */}
        <div className="col-start-1 row-start-1 row-span-3 relative w-full aspect-square">
          <AnimatePresence custom={direction}>
            {activities.map((activity, index) => {
              const isActive = activity.id === activeId;
              const offset = index - activeIndex;
              const rotations = [4, -2, -9, 7];

              return (
                <motion.div
                  key={activity.id}
                  className={cn(
                    "absolute inset-0 w-full h-full  overflow-hidden border-[6px] bg-neutral-200 dark:bg-neutral-100 border-white dark:border-neutral-100 shadow-2xl"
                  )}
                  initial={{
                    x: offset * 15,
                    y: Math.abs(offset) * 6,
                    z: -150 * Math.abs(offset),
                    scale: 0.85 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 15, direction === 1 ? -200 : 200, 0],
                          y: [Math.abs(offset) * 6, 0, 0],
                          z: [-200, 150, 250],
                          scale: [0.85, 1.05, 1],
                          rotateZ: [rotations[index % 4], -5, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 15,
                          y: Math.abs(offset) * 6,
                          z: -150 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.85 - Math.abs(offset) * 0.04,
                          opacity: 0.55,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -250 : 250,
                    z: -260,
                    scale: 0.75,
                    rotateZ: direction === 1 ? -10 : 10,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img src={activity.image} className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text Area */}
        <div className="col-start-2 row-start-2 flex flex-col justify-center min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeActivity.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-xl font-bold dark:text-white">{activeActivity.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                {activeActivity.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="col-start-2 row-start-3 flex gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            disabled={activeIndex === 0}
            onClick={handlePrev}
            className="rounded-full"
          >
            <ArrowLeft className="w-10 h-10" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={activeIndex === activities.length - 1}
            onClick={handleNext}
            className="rounded-full"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
