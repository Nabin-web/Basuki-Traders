"use client";
import { COUNTRIES } from "@/utils/constants";
import React from "react";
import Marquee from "react-fast-marquee";

const Countries = () => {
  return (
    <div className="mt-14">
      <h4 className="text-2xl text-primary font-bold mb-8 text-center border-b border-gray-300 pb-2">
        Countries that we import from and export to
      </h4>
      <Marquee
        className="h-full overflow-hidden"
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
