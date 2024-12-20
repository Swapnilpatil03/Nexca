"use client";
import { Button, LogoSec, ThemeToggle } from "@/components";
import SiteConfig from "@/config/stie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileMenu";
import GitHubBtn from "./GitHubBtn";

const Header = () => {
  const pathname = usePathname();
  const nav = SiteConfig.nav;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="navbar fixed left-0 right-0 top-0 z-[50] mx-auto my-2 w-[94%] rounded-xl border-2 border-indigo-400 bg-base-100 shadow-xl transition-all hover:border-indigo-700 md:w-[92%]">
        <div className="navbar">
          <div className="navbar-start">
            <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
            <LogoSec siteName={SiteConfig.name} LogoOnlyInDesktop={true} />
          </div>
          <div className="navbar-center hidden lg:flex">
            <HeaderMenu pathname={pathname} nav={nav} />
          </div>
          <div className="navbar-end gap-3">
            <ThemeToggle />
            <GitHubBtn link={SiteConfig.github}/>
          </div>
        </div>
      </header>
      {isOpen && <MobileMenu pathname={pathname} nav={nav} />}
    </>
  );
};

export default Header;
