"use client"
import React from 'react'
import { cn } from "@/lib/utils"
import styles from './MaskedAvatars.module.css'
import { ArrowRight } from 'lucide-react'

interface Avatar {
  avatar: string;
  name: string;
}

interface MaskedAvatarsProps {
  avatars?: Avatar[];
  size?: number;
  border?: number;
  column?: number;
  movement?: number;
  transition?: number;
  ltr?: boolean;
  ringed?: boolean;
  offset?: number;
  className?: string;
}

const defaultAvatars: Avatar[] = [
  {
    avatar: '/garou1.jpg',
    name: 'Garou',
  },
  {
    avatar: '/johan.jpeg',
    name: 'Johan',
  },
  {
    avatar: '/Light yagami.jpeg',
    name: 'Light Yagami',
  },
  {
    avatar: '/Vegeta.jpg',
    name: 'Vegeta',
  },
]

export function MaskedAvatars({
  avatars = defaultAvatars,
  size = 70,
  border = 8,
  column = 40,
  movement = 0.72,
  transition = 0.18,
  ltr = true,
  ringed = true,
  offset = -3,
  className
}: MaskedAvatarsProps) {
  
  const style = {
    '--size': size,
    '--border': border,
    '--column': column,
    '--movement': movement,
    '--transition': transition,
    '--offset': offset,
  } as React.CSSProperties;

  return (
    <div 
      className={cn(styles.wrapper, className)} 
      data-ltr={ltr} 
      data-ringed={ringed}
      style={style}
    >
      <div className={styles.container}>
        <ul className={styles.items}>
          {avatars.map((person, index) => (
            <li key={index}>
              <span className={styles.name}>
                {person.name.split('').map((char, i) => (
                  <span key={i} style={{ '--i': i } as React.CSSProperties}>
                    {char}
                  </span>
                ))}
              </span>
              <div className={styles.avatarHolder}>
                <span className={styles.avatar}>
                  <img src={person.avatar} alt={person.name} />
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
            aria-label="View more"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
