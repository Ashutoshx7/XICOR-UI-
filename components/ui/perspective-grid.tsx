"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
  className?: string;
}

export function PerspectiveGrid({ className }: PerspectiveGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 40x40 grid = 1600 tiles
  const tiles = Array.from({ length: 1600 });

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white dark:bg-black",
        "[--fade-stop:#ffffff] dark:[--fade-stop:#000000]",
        className
      )}
      style={{
        perspective: "2000px",
      }}
    >
      <div
        className="absolute top-0 left-0 w-[140rem] aspect-square grid origin-center"
        style={{
          // Center the grid in the container
          left: "50%",
          top: "50%",
          // Exact transform from the CodePen
          transform:
            "translate(-50%, -50%) rotateX(50deg) rotateY(-5deg) rotateZ(20deg) scale(1.25)",
          gridTemplateColumns: "repeat(40, 1fr)",
          gridTemplateRows: "repeat(40, 1fr)",
        }}
      >
        {/* Tiles */}
        {mounted &&
          tiles.map((_, i) => (
            <div
              key={i}
              className="tile border border-black/10 dark:border-white/25 transition-colors duration-[1500ms] hover:duration-0"
            />
          ))}
      </div>

      {/* Radial Gradient Mask (Overlay) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, transparent 25%, var(--fade-stop) 80%)",
        }}
      />

      <style jsx>{`
        .tile:nth-child(4n):hover {
          background-color: rgb(248 113 113);
        }
        .tile:nth-child(4n + 1):hover {
          background-color: rgb(56 189 248);
        }
        .tile:nth-child(4n + 2):hover {
          background-color: rgb(74 222 128);
        }
        .tile:nth-child(4n + 3):hover {
          background-color: rgb(253 224 71);
        }
        .tile:nth-child(7n):hover {
          background-color: rgb(56 189 248);
        }
        .tile:nth-child(7n + 3):hover {
          background-color: rgb(74 222 128);
        }
        .tile:nth-child(7n + 5):hover {
          background-color: rgb(253 224 71);
        }
        .tile:nth-child(7n + 6):hover {
          background-color: rgb(248 113 113);
        }
        .tile:nth-child(11n + 1):hover {
          background-color: rgb(248 113 113);
        }
        .tile:nth-child(11n + 4):hover {
          background-color: rgb(56 189 248);
        }
        .tile:nth-child(11n + 7):hover {
          background-color: rgb(74 222 128);
        }
        .tile:nth-child(11n + 10):hover {
          background-color: rgb(253 224 71);
        }
      `}</style>
    </div>
  );
}
