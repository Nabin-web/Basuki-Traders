import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Button";

const Slogan = () => {
  return (
    <div className=" mb-8">
      <div className="relative h-96 ">
        <div className=" text-4xl capitalize text-left absolute top-16 left-8 z-20 text-white tracking-wider leading-loose font-bold">
          <span>Connecting </span>
          <span className=" text-primary">Worlds, </span> <br />
          <span>Delivering </span>
          <span className=" text-primary">Possibilities</span>
          <div>
            <Button className="px-6 py-4 text-3xl flex items-center gap-2 rounded-lg bg-primary hover:underline hover:opacity-40">
              Join us <FaArrowRight />
            </Button>
          </div>
        </div>
        <Image
          src="/containers.jpg"
          layout="fill"
          objectFit="cover"
          className=" w-full h-full"
          alt="food image"
        />
      </div>
    </div>
  );
};

export default Slogan;
