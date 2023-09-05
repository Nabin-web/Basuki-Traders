import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="h-screen flex-1 flex mt-32 mx-auto">
      <div className="text-center mx-auto">
        <h1 className="text-6xl font-semibold tracking-wider">
          Welcome to <br />
          <span className=" text-orange-500 ">Ashirbad Traders !</span>
        </h1>
        <p className="font-light text-3xl mt-5 tracking-wide">
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
      <div className=" relative w-1/2 h-1/2">
        <Image
          src="/herosection.jpg"
          priority
          style={{ objectFit: "contain" }}
          fill
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default HeroSection;
