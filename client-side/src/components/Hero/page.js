import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-screen grid grid-cols-1  sm:grid-cols-2 mt-20 mx-auto">
      <div className="text-center mx-auto pt-16">
        <h1 className=" text-2xl sm:text-6xl font-semibold tracking-wider">
          Welcome to <br />
          <span className=" text-orange-500 ">Ashirbad Traders !</span>
        </h1>
        <p className="font-light text-xl sm:text-3xl mt-5 tracking-wide">
          One stop shop for you <br /> all you{" "}
          <span className=" text-orange-500">Grocery Needs</span>
        </p>
        <a
          className="px-5 py-2 inline-block border-2 border-orange-500 hover:bg-orange-400 transition-colors mt-10"
          href=""
        >
          Get Started
        </a>
      </div>
      <div className="relative w-[600px] h-[400px]">
        <Image
          src="/herosection.jpg"
          className=" w-full h-full"
          fill
          quality={85}
        />
      </div>
    </section>
  );
};

export default HeroSection;
