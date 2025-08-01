"use client";
import { GlobalSearchInput } from "@/components/molecules";
import { HeaderMenuConfigType } from "@/types/entities";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = ({
  pathname,
  nav,
}: {
  pathname: string;
  nav: HeaderMenuConfigType[];
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <nav className="fixed left-0 bg-base-200 top-[80px] z-50 mx-auto w-[90%] sm:w-[70%] md:w-[60%] h-full border-2 border-indigo-700 lg:hidden">
      <ul className="my-3 h-screen overflow-y-auto flex flex-col items-center gap-4 bg-inherit p-2  lg:hidden">
        <li
          className="flex items-center gap-3"
          key={`mobile_menu_item_starter`}
        >
          <GlobalSearchInput className="block w-full lg:hidden" />
        </li>

        {nav?.map((item) => {
          return (
            <li
              key={`mobile_menu_item_${item.id}`}
              onClick={() => item.children && toggleItem(item.id)}
              className="mx-1 w-3/4"
            >
              {pathname === item.link ? (
                <Link
                  href={item.link}
                  title={item.link}
                  className="block w-full rounded-xl bg-indigo-700 p-2 text-center text-white hover:bg-indigo-700"
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  className="block w-full rounded-xl border-2 border-indigo-700 p-2 text-center"
                  href={item.link}
                  title={item.link}
                >
                  {item.name}
                </Link>
              )}
              {item.children && (
                <ul
                  className={`grid grid-cols-2 gap-4 mt-2 transition-all duration-300 ease-in-out overflow-hidden 
              ${activeId === item.id ? "max-h-screen" : "max-h-0"}`}
                >
                  {item.children.map((nav) => (
                    <li
                      key={nav.id}
                      className="rounded-xl border-2 border-indigo-700 p-2"
                    >
                      <Link href={nav.href} title={nav.name}>
                        {nav.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileMenu;
