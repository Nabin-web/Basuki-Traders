"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
      className={`sticky top-0 bg-white z-20 ${
        offset > 40 ? "shadow-md" : ""
      } duration-200`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="Picture of the logo"
          priority
        />
        <div className="flex gap-8 items-center">
          {links.map((e) => (
            <Link
              prefetch={false}
              href={e.path}
              className={`${
                pathname == e.path ? "text-orange-500" : ""
              } duration-300 text-base`}
            >
              {e.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const links = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Search", path: "/search" },
  { label: "About Us", path: "/about-us" },
  { label: "Our Network", path: "/out-network" },
  { label: "Contact Us", path: "/contact-us" },
];
