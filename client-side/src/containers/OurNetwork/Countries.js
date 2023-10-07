"use client";
import { COUNTRIES } from "@/utils/constants";
import React from "react";
import Marquee from "react-fast-marquee";
import { TbArrowsExchange2 } from "react-icons/tb";

const Countries = () => {
  return (
    <div className="mb-20 mt-14 lg:mt-20 mx-4">
      <h4 className="text-2xl text-primary font-bold mb-1 flex items-center gap-2">
        Import
        <TbArrowsExchange2 className="text-3xl" />
        Export
      </h4>
      <div className="text-base text-gray-500 mb-3">
        Our products are imported from and exported to these countries.
      </div>
      <Marquee
        className="h-full overflow-hidden border-b border-t py-10 border-gray-300"
        pauseOnHover
        gradient
        gradientWidth={300}
      >
        <div className="flex items-center gap-24 font-bold uppercase text-2xl">
          {COUNTRIES.map((e) => (
            <div key={e.name}>{e.name}</div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Countries;
