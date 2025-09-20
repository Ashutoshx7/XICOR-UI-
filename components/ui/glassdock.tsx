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
        fixed bottom-6 inset-x-0 mx-auto 
        flex justify-center space-x-8
        rounded-3xl border border-black-500/50 
        blur-in-xl  backdrop-blur-lg
        py-3 px-6 w-fit  inset-shadow-sm inset-shadow-slate-500/50
      
        
       
         

      "
      
            
        > 
            {links.map((el) => {
                const Icon = el.icon;
                return (
                    <Link
                        key={el.title}
                        href={el.href}
                        className="
              flex items-center justify-center w-10 h-12
               text-gray-900 hover:text-gray-700
              
            "
                    >
                        <Icon className="w-full h-full" />
                        
                    </Link>
                );
            })}
        </div>
       
    );
};

export default GlassdockCore;
