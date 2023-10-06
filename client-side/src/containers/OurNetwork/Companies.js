import { clients } from "@/utils/constants";
import Image from "next/image";
import React from "react";

const Companies = () => {
  return (
    <div className="my-20">
      <h2 className="uppercase text-2xl font-bold text-center text-primary mb-2">
        our client
      </h2>
      <div className="text-base text-gray-500 mb-6 text-center">
        Trust us like this companies did.
      </div>
      <div className="grid grid-cols-3 gap-8">
        {clients.map((e) => (
          <div className="relative w-full h-[100px]" key={e.name}>
            <Image
              fill
              sizes="500px"
              src={e.logo}
              className="h-auto w-full object-contain grayscale hover:grayscale-0 duration-200 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
