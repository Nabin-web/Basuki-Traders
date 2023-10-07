"use client";
import { NumberAmimate } from "@/utils/constants";
import Image from "next/image";
import React from "react";

import AnimatedNumber from "react-animated-number";

const CompanyNetworks = () => {
  return (
    <div className=" mb-8">
      <div className="relative h-96 ">
        <div className=" grid grid-cols-2 gap-6 text-xl capitalize text-left absolute top-16 right-8 z-20 text-black tracking-wider leading-loose">
          {NumberAmimate.map((each) => (
            <div key={each.key}>
              <div>{each.key}</div>

              <div className=" flex items-center text-primary">
                <AnimatedNumber
                  component="text"
                  initialValue={each?.initialValue}
                  value={each.currentValue}
                  stepPrecision={0}
                  style={{
                    transition: "0.8s ease-out",
                    fontSize: 48,
                    transitionProperty: "background-color, color, opacity",
                  }}
                  duration={1000}
                  formatValue={(n) => Intl.NumberFormat("en-US").format(n)}
                />
                +
              </div>
            </div>
          ))}
        </div>
        <Image
          src="/company.jpg"
          layout="fill"
          objectFit="cover"
          className=" w-full h-full"
          alt="food image"
        />
      </div>
    </div>
  );
};

export default CompanyNetworks;
