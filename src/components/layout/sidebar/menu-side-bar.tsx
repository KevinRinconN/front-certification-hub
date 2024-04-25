"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useElementBackDrop } from "@/hooks/useElementBackdrop";
import { ActiveLink } from "./active-link";
import { Route } from "@/routes/admin.routes";

interface menuSideBarProps {
  title: string;
  routes: Route[];
}

export default function MenuSideBar({ title, routes }: menuSideBarProps) {
  const pathName = usePathname();

  const activeLink = useRef<HTMLAnchorElement>(null);
  const parentRef = useRef<HTMLHeadingElement>(null);

  const menu = useElementBackDrop(parentRef);
  const hoverBackDrop = useElementBackDrop(parentRef);

  useEffect(() => {
    if (activeLink && activeLink.current) {
      menu.setTop(activeLink.current);
    }
  }, [activeLink.current]);

  return (
    <div>
      <h2 className="flex text-base font-semibold text-zinc-900">{title}</h2>
      <div
        ref={parentRef}
        onMouseLeave={() => hoverBackDrop.setVisible("hidden")}
        className="relative mt-4 pl-3"
      >
        <ul
          role="list"
          className="relative border-l-4 [&>li>a]:flex [&>li>a]:items-center"
          id="landing-header"
        >
          {routes.map(({ icon: IconComponent, name, path }) => (
            <li key={path} className="mb-1.5">
              <ActiveLink
                refActive={pathName.includes(path) ? activeLink : null}
                onMouseEnter={(e) => hoverBackDrop.setTop(e.currentTarget)}
                path={path}
              >
                <IconComponent className="w-6 mr-4" /> {name}
              </ActiveLink>
            </li>
          ))}
        </ul>
        <div
          ref={menu.menuBackDrop}
          className="absolute left-3 top-0 transition-transform duration-500 ease-in-out w-1 h-8 bg-secondary backdrop-blur-lg rounded-md"
        ></div>
        <div
          ref={hoverBackDrop.menuBackDrop}
          className="absolute invisible top-0 left-0 w-full h-9 -z-20 transition-transform duration-300 ease-out bg-accent backdrop-blur-sm rounded"
        ></div>
      </div>
    </div>
  );
}
