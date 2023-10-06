import React from "react";
import Image from "next/image";

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

        <div className="text-justify">
          <div className=" text-6xl leading-loose tracking-widest ">
            About <span className=" text-primary">Us</span>
          </div>
          <p className=" mb-4 text-sm leading-loose tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p className=" mb-4 text-sm leading-loose tracking-wide">
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>

      {/* Our Vision */}
      <div className="relative grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center container mx-auto pt-8 mb-8">
        <div className="text-justify">
          <div className=" text-6xl leading-loose tracking-widest ">
            Our <span className=" text-primary">Vision</span>
          </div>
          <p className=" mb-4 text-sm leading-loose tracking-wide">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p className=" mb-4 text-sm leading-loose tracking-wide">
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
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
    </>
  );
};

export default About;
