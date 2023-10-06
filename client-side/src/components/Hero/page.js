import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="my-20 mb-28 flex flex-col lg:flex-row items-center gap-20 mx-auto">
      <Image
        src="/herosection.png"
        className="md:ml-16"
        priority
        height={450}
        width={380}
        quality={85}
        alt="Basuki Traders"
      />
      <div className="relative text-center lg:text-left">
        <Image
          src="/tomato-hero.png"
          className="-ml-4 hidden lg:block"
          height={100}
          width={100}
          alt="Tomato Grocery"
        />
        <h1 className="text-3xl md:text-5xl font-bold mb-0 lg:mb-3">
          All your{" "}
          <span className="text-primary capitalize">grocery needs</span>{" "}
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold mb-0 lg:mb-4 text-center md:text-left flex items-center justify-center lg:block">
          under one roof.
          <Image
            src="/tomato-hero.png"
            className="-ml-2 block lg:hidden"
            height={100}
            width={100}
            alt="Tomato Grocery"
          />
        </h1>
        <p className="text-gray-500 px-4 md:px-0">
          We believe in making your shopping experience as convenient as
          possible.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
