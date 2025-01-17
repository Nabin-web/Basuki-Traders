import React from "react";
import Image from "next/image";
import { AboutUsText, Visions } from "@/utils/constants";

const About = () => {
  return (
    <>
      {/* {" About US"} */}
      <div className="relative grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center container mx-auto pt-8">
        <div className="relative w-full h-[150px] md:h-[500px] sm:h-[300px] sm:mt-6 flex justify-center md:items-center">
          <Image
            src="/aboutus.jpg"
            fill
            sizes="800px"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-justify px-4 lg:px-0">
          <div className="text-4xl lg:text-6xl leading-loose tracking-widest mb-4">
            About <span className=" text-primary">Us</span>
          </div>
          {AboutUsText.text1 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {AboutUsText.text1}
            </p>
          )}
          {AboutUsText.text2 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {AboutUsText.text2}
            </p>
          )}
        </div>
      </div>

      {/* Our Visions */}
      <div className="relative grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center container mx-auto pt-8 mb-8">
        <div className="text-justify px-4 lg:px-0">
          <div className="text-4xl lg:text-6xl leading-loose tracking-widest mb-4">
            Our <span className=" text-primary">Vision</span>
          </div>
          {Visions.text1 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {Visions.text1}
            </p>
          )}
          {Visions.text2 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {Visions.text2}
            </p>
          )}
        </div>

        <div className="relative w-full md:h-[500px] sm:h-[300px] sm:mt-6 flex justify-center md:items-center">
          <Image
            src="/aboutus.jpg"
            fill
            sizes="800px"
            className="w-auto h-full object-cover"
          />
        </div>
      </div>

      {/* {" Our Mission"} */}
      <div className="relative grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center container mx-auto pt-8">
        <div className="relative w-full h-[150px] md:h-[500px] sm:h-[300px] sm:mt-6 flex justify-center md:items-center">
          <Image
            src="/aboutus.jpg"
            fill
            sizes="800px"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-justify px-4 lg:px-0">
          <div className="text-4xl lg:text-6xl leading-loose tracking-widest mb-4">
            Our <span className=" text-primary">Mission</span>
          </div>
          {AboutUsText.text1 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {AboutUsText.text1}
            </p>
          )}
          {AboutUsText.text2 && (
            <p className=" mb-4 text-sm leading-loose tracking-wide">
              {AboutUsText.text2}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
