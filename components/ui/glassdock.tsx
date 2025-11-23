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
                fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                flex gap-4 backdrop-blur-xl
                px-6 py-3 rounded-2xl
                bg-white/40 dark:bg-neutral-900/40
                border border-white/30 dark:border-neutral-700/30
                shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                ring-1 ring-white/20 dark:ring-black/10
                transition-all duration-300
            "
        >
            {links.map((el) => {
                const Icon = el.icon;
                return (
                    <Link
                        key={el.title}
                        href={el.href}
                        title={el.title}
                        className="
                            group flex items-center justify-center
                            w-12 h-12 rounded-full
                            bg-white/70 dark:bg-neutral-800/70
                            border border-neutral-200/60 dark:border-neutral-700/50
                            text-neutral-800 dark:text-neutral-200
                            shadow-sm hover:shadow-lg
                            hover:bg-white/90 dark:hover:bg-neutral-700/90
                            hover:-translate-y-1 hover:scale-105
                            transition-all duration-200 ease-out
                        "
                    >
                        <Icon
                            className="
                                w-6 h-6
                                transition-all duration-200
                                group-hover:scale-110
                                group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]
                            "
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default GlassdockCore;
