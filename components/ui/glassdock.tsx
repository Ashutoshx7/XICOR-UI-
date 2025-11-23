"use client";

import Link from "next/link";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal,
    IconTerminal2,
} from "@tabler/icons-react";
import React from "react";

const GlassdockCore = () => {
    const links = [
        { title: "Home", icon: IconHome, href: "/" },
        { title: "Products", icon: IconTerminal2, href: "/product" },
        { title: "Components", icon: IconNewSection, href: "/components" },
        { title: "Archive", icon: IconTerminal, href: "/archive" },
        { title: "ChangeLog", icon: IconExchange, href: "/changelog" },
        { title: "Twitter", icon: IconBrandX, href: "https://twitter.com" },
        { title: "Github", icon: IconBrandGithub, href: "https://github.com" },
    ];

    return (
    
                <div
                        className="
                fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                flex justify-center items-center gap-4
                rounded-2xl
                px-6 py-3 w-fit
                backdrop-blur-xl bg-linear-to-br from-white/60 via-white/30 to-white/10 dark:from-neutral-900/60 dark:via-neutral-800/30 dark:to-neutral-900/10
                border border-neutral-300 dark:border-neutral-700/40
                shadow-xl shadow-black/10 dark:shadow-neutral-900/40
                ring-1 ring-white/20 dark:ring-neutral-800/30
                transition-all duration-300
                "
                >
            {links.map((el) => {
                const Icon = el.icon;
                return (
                    <Link
                        key={el.title}
                        href={el.href}
                        className="
                            flex items-center justify-center w-11 h-11 rounded-full
                            bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700/40
                            text-gray-900 dark:text-neutral-100 hover:text-blue-500 dark:hover:text-blue-400
                            shadow-md shadow-black/10 dark:shadow-neutral-900/30
                            transition-all duration-200 ease-out
                            hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/40 dark:hover:ring-blue-500/30
                            hover:bg-white/90 dark:hover:bg-neutral-800/90
                            group
                        "
                        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
                        title={el.title}
                    >
                        <Icon className="w-6 h-6 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                    </Link>
                );
            })}
        </div>
       
    );
};

export default GlassdockCore;
