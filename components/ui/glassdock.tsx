import React from 'react';
import { 
  Home, 
  Terminal, 
  Layout, 
  Archive, 
  History, 
  Twitter, 
  Github 
} from 'lucide-react';

const GlassDock = () => {
  const links = [
    { title: "Home", icon: Home, href: "#" },
    { title: "Products", icon: Terminal, href: "#" },
    { title: "Components", icon: Layout, href: "#" },
    { title: "Archive", icon: Archive, href: "#" },
    { title: "ChangeLog", icon: History, href: "#" },
    { title: "Twitter", icon: Twitter, href: "#" },
    { title: "Github", icon: Github, href: "#" },
  ];

  return (
    <>
      <style>{`
        /* =========================================
           CSS 3D & ANIMATION DEFINITIONS
           =========================================
        */
        @property --angle-1 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -75deg;
        }

        @property --angle-2 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -45deg;
        }

        :root {
          /* --- GLOBAL CONSTANTS --- */
          --btn-size: 3rem; 
          --anim--hover-time: 400ms;
          --anim--hover-ease: cubic-bezier(0.25, 1, 0.5, 1);

          /* --- LIGHT MODE VARIABLES --- */
          --glass-surface: linear-gradient(
            -75deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.05)
          );
          --glass-shadow: 
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
            0 0 0 0 rgba(255, 255, 255, 1);
            
          --glass-shadow-hover: 
            inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.25),
            0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.5),
            0 0 0 0 rgba(255, 255, 255, 1);

          --text-color: rgba(50, 50, 50, 1);
          --text-shadow: 0em 0.25em 0.05em rgba(0, 0, 0, 0.1);
          
          --outline-color-1: rgba(0, 0, 0, 0.5); /* Rotating dark segment */
          --outline-color-2: rgba(255, 255, 255, 0.5); /* Static light segment */
          --outline-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255, 255, 255, 0.5);
          
          --shimmer-color: rgba(255, 255, 255, 0.5);
        }

        /* --- DARK MODE OVERRIDES --- */
        @media (prefers-color-scheme: dark) {
          :root {
            --glass-surface: linear-gradient(
              -75deg,
              rgba(255, 255, 255, 0.02),
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.02)
            );
            --glass-shadow: 
              inset 0 0.125em 0.125em rgba(0, 0, 0, 0.5),
              inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.15),
              0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.5),
              0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.05),
              0 0 0 0 rgba(0, 0, 0, 1);

            --glass-shadow-hover: 
              inset 0 0.125em 0.125em rgba(0, 0, 0, 0.5),
              inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.2),
              0 0.15em 0.05em -0.1em rgba(0, 0, 0, 0.5),
              0 0 0.05em 0.1em inset rgba(255, 255, 255, 0.1),
              0 0 0 0 rgba(0, 0, 0, 1);

            --text-color: rgba(220, 220, 220, 1);
            --text-shadow: 0em 0.25em 0.05em rgba(0, 0, 0, 0.5);
            
            --outline-color-1: rgba(255, 255, 255, 0.4); /* Rotating light segment for dark mode */
            --outline-color-2: rgba(255, 255, 255, 0.1); 
            --outline-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255, 255, 255, 0.1);

            --shimmer-color: rgba(255, 255, 255, 0.25);
          }
        }
        
        /* Support for manual .dark class toggle (Tailwind style) */
        .dark {
           --glass-surface: linear-gradient(-75deg, rgba(255,255,255,0.02), rgba(255,255,255,0.1), rgba(255,255,255,0.02));
           --glass-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.5), inset 0 -0.125em 0.125em rgba(255,255,255,0.15), 0 0.25em 0.125em -0.125em rgba(0,0,0,0.5), 0 0 0.1em 0.25em inset rgba(255,255,255,0.05), 0 0 0 0 rgba(0,0,0,1);
           --glass-shadow-hover: inset 0 0.125em 0.125em rgba(0,0,0,0.5), inset 0 -0.125em 0.125em rgba(255,255,255,0.2), 0 0.15em 0.05em -0.1em rgba(0,0,0,0.5), 0 0 0.05em 0.1em inset rgba(255,255,255,0.1), 0 0 0 0 rgba(0,0,0,1);
           --text-color: rgba(220, 220, 220, 1);
           --text-shadow: 0em 0.25em 0.05em rgba(0,0,0,0.5);
           --outline-color-1: rgba(255,255,255,0.4);
           --outline-color-2: rgba(255,255,255,0.1);
           --outline-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255,255,255,0.1);
           --shimmer-color: rgba(255,255,255,0.25);
        }


        /* Wrapper for the 3D perspective context */
        .glass-dock-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Button Wrap Container */
        .button-wrap {
          position: relative;
          z-index: 2;
          width: var(--btn-size);
          height: var(--btn-size);
          border-radius: 50%;
          background: transparent;
          pointer-events: auto;
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Button Shadow Container */
        .button-shadow {
          --shadow-cuttoff-fix: 2em;
          position: absolute;
          width: calc(100% + var(--shadow-cuttoff-fix));
          height: calc(100% + var(--shadow-cuttoff-fix));
          top: calc(0% - var(--shadow-cuttoff-fix) / 2);
          left: calc(0% - var(--shadow-cuttoff-fix) / 2);
          filter: blur(clamp(2px, 0.125em, 12px));
          -webkit-filter: blur(clamp(2px, 0.125em, 12px));
          pointer-events: none;
          overflow: visible;
        }

        .button-shadow::after {
          content: "";
          position: absolute;
          z-index: 0;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
          width: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          height: calc(100% - var(--shadow-cuttoff-fix) - 0.25em);
          top: calc(var(--shadow-cuttoff-fix) - 0.5em);
          left: calc(var(--shadow-cuttoff-fix) - 0.875em);
          padding: 0.125em;
          box-sizing: border-box;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
          opacity: 1;
        }

        /* ========== BUTTON BASE STYLES ========== */

        .glass-btn {
          --border-width: clamp(1px, 0.0625em, 4px);
          all: unset;
          cursor: pointer;
          position: relative;
          width: 100%;
          height: 100%;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          pointer-events: auto;
          z-index: 3;
          background: var(--glass-surface);
          border-radius: 50%;
          box-shadow: var(--glass-shadow);
          backdrop-filter: blur(clamp(1px, 0.125em, 4px));
          -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glass-btn:hover {
          transform: scale(0.975);
          backdrop-filter: blur(0.01em);
          -webkit-backdrop-filter: blur(0.01em);
          box-shadow: var(--glass-shadow-hover);
        }

        /* Icon Container */
        .glass-btn-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: var(--text-color);
          filter: drop-shadow(var(--text-shadow));
          transition: all var(--anim--hover-time) var(--anim--hover-ease);
        }

        .glass-btn:hover .glass-btn-content {
          filter: drop-shadow(0.025em 0.025em 0.025em rgba(0, 0, 0, 0.12));
          transform: scale(1.1);
        }

        /* Shimmer Effect */
        .glass-btn-content::after {
          content: "";
          display: block;
          position: absolute;
          z-index: 1;
          width: calc(100% - var(--border-width));
          height: calc(100% - var(--border-width));
          top: calc(0% + var(--border-width) / 2);
          left: calc(0% + var(--border-width) / 2);
          box-sizing: border-box;
          border-radius: 50%;
          overflow: clip;
          background: linear-gradient(
            var(--angle-2),
            rgba(255, 255, 255, 0) 0%,
            var(--shimmer-color) 40% 50%,
            rgba(255, 255, 255, 0) 55%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          background-size: 200% 200%;
          background-position: 0% 50%;
          background-repeat: no-repeat;
          transition: background-position calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease),
            --angle-2 calc(var(--anim--hover-time) * 1.25) var(--anim--hover-ease);
        }

        .glass-btn:hover .glass-btn-content::after {
          background-position: 25% 50%;
        }

        .glass-btn:active .glass-btn-content::after {
          background-position: 50% 15%;
          --angle-2: -15deg;
        }

        /* Outline Ring */
        .glass-btn::after {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          border-radius: 50%;
          width: calc(100% + var(--border-width));
          height: calc(100% + var(--border-width));
          top: calc(0% - var(--border-width) / 2);
          left: calc(0% - var(--border-width) / 2);
          padding: var(--border-width);
          box-sizing: border-box;
          background: conic-gradient(
              from var(--angle-1) at 50% 50%,
              var(--outline-color-1),
              rgba(0, 0, 0, 0) 5% 40%,
              var(--outline-color-1) 50%,
              rgba(0, 0, 0, 0) 60% 95%,
              var(--outline-color-1)
            ),
            linear-gradient(180deg, var(--outline-color-2), var(--outline-color-2));
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          transition: all var(--anim--hover-time) var(--anim--hover-ease),
            --angle-1 500ms ease;
          box-shadow: var(--outline-shadow);
        }

        .glass-btn:hover::after {
          --angle-1: -125deg;
        }

        .glass-btn:active::after {
          --angle-1: -75deg;
        }

        /* Hover & Active States for Container */
        .button-wrap:has(.glass-btn:hover) .button-shadow {
          filter: blur(clamp(2px, 0.0625em, 6px));
          -webkit-filter: blur(clamp(2px, 0.0625em, 6px));
        }

        .button-wrap:has(.glass-btn:hover) .button-shadow::after {
          top: calc(var(--shadow-cuttoff-fix) - 0.875em);
          opacity: 1;
        }

        /* 3D Rotation on Click */
        .button-wrap:has(.glass-btn:active) {
          transform: rotate3d(1, 0, 0, 25deg) translateY(2px);
        }
        
        .button-wrap:has(.glass-btn:active) .glass-btn {
           box-shadow: var(--glass-shadow-hover);
        }
      `}</style>

      {/* Background for demonstration purposes */}
      <div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-max">
        <div 
            className="
                glass-dock-container
                flex gap-4 items-center
                px-6 py-4 rounded-2xl
                bg-white/20 dark:bg-neutral-900/20
                backdrop-blur-xl
                border border-white/30 dark:border-neutral-700/30
                shadow-[0_20px_40px_rgba(0,0,0,0.2)]
                ring-1 ring-white/20 dark:ring-black/10
            "
        >
            {links.map((el) => {
                const Icon = el.icon;
                return (
                    <div className="button-wrap" key={el.title}>
                        <div className="button-shadow"></div>
                        <a 
                            href={el.href} 
                            className="glass-btn group"
                            title={el.title}
                        >
                            <span className="glass-btn-content">
                                <Icon strokeWidth={2} size={20} />
                            </span>
                        </a>
                    </div>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default GlassDock;