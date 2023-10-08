import { whoWeAreText } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const HomeAboutUs = () => {
  return (
    <div className="mt-28 mb-10">
      <div className="text-center text-5xl font-bold capitalize mb-6">
        Who we are
      </div>
      <div className="mb-5 mx-auto max-w-5xl text-center">
        {whoWeAreText.text1}
      </div>
      <div className="mb-6 mx-auto max-w-6xl text-center">
        {whoWeAreText.text2}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/about-us"
          className="flex items-center gap-2 text-sm hover:text-primary duration-200 border-b border-gray-300 pb-2 hover:border-primary"
        >
          Read More
          <RiArrowRightDoubleFill className="text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default HomeAboutUs;
