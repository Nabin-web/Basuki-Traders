"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Mobile from "./components/Mobile";
import { links } from "@/utils/constants";

const Navbar = () => {
  const pathname = usePathname();
  const [offset, setOffset] = useState(0);

  const setScroll = () => {
    setOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  }, []);

  if (pathname.includes("/admin")) {
    return null;
  }
  return (
    <header
      className={`sticky px-4 md:px-0 top-0 z-20 ${
        offset > 20 ? "shadow-md backdrop-blur-sm" : ""
      } bg-white/60`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link prefetch={false} href="/" className="py-6">
          {/* <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="Picture of the logo"
            priority
          /> */}
          <div className="text-2xl font-bold text-primary">
            Ashirbad Traders
          </div>
        </Link>
        <div className="hidden lg:flex gap-8 items-center">
          {links.map((e) => (
            <Link
              prefetch={false}
              href={e.path}
              className={`${
                pathname == e.path ? "text-primary" : ""
              } duration-300 text-base`}
              key={e.label}
            >
              {e.label}
            </Link>
          ))}
        </div>
        <Mobile />
      </div>
    </header>
  );
};

export default Navbar;
