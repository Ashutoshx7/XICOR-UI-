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
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-400" />,
      href: "/",
    },
    {
      title: "Products",
      icon: <IconTerminal2 className="h-full w-full text-neutral-400" />,
      href: "/product",
    },
    {
      title: "Components",
      icon: <IconNewSection className="h-full w-full text-neutral-400" />,
      href: "/components",
    },
    {
      title: "Archive",
      icon: <IconTerminal className="h-full w-full text-neutral-400" />,
      href: "/archive",
    },
    {
      title: "ChangeLog",
      icon: <IconExchange className="h-full w-full text-neutral-400" />,
      href: "/changelog",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-400" />,
      href: "https://twitter.com",
    },
    {
      title: "Github",
      icon: <IconBrandGithub className="h-full w-full text-neutral-400" />,
      href: "https://github.com",
    },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 mx-auto flex justify-center space-x-6 bg-white/10 backdrop-blur-[2px]  rounded-2xl border border-white/10  before:content-[''] before:absolute before:inset-0-before:rounded-2xl before:border before:border-white/20  py-3 px-6  w-fit">
      {links.map((el) => (
        <Link
          key={el.title}
          href={el.href}
          className="flex items-center justify-center w-10 h-"
        >
          {el.icon}
        </Link>
      ))}
    </div>
  );
};

export default GlassdockCore;
