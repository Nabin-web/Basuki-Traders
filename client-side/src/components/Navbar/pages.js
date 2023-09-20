"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname.includes("/admin")) {
    return null;
  }
  return (
    <header className="flex items-center justify-center text-white bg-orange-300">
      <div className="mx-auto relative px-5 max-w-screen-xl w-full flex items-center">
        <Image
          src="/logo.png"
          width={120}
          height={120}
          alt="Picture of the logo"
        />
        <ul className="flex  items-center gap-4 ">
          <li>
            <a
              href="#"
              className=" hover:border-b-white border-transparent border-2 pb-4 "
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" hover:border-b-white border-transparent border-2 pb-4"
            >
              Products
            </a>
          </li>
          <li>
            <a
              className=" hover:border-b-white border-transparent border-2 pb-4"
              href="#"
            >
              About Us
            </a>
          </li>

          <li>
            <a
              className=" hover:border-b-white border-transparent border-2 pb-4"
              href="#"
            >
              Our Network
            </a>
          </li>

          <li>
            <a
              className=" hover:border-b-white border-transparent border-2 pb-4"
              href="#"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
