"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NextArrow = ({ onClick }) => {
  return (
    <div className="absolute right-0 -top-[80px]" onClick={onClick}>
      <div className=" bg-[#fab1a0] h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer ">
        <BsChevronRight />
      </div>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="absolute right-[80px] -top-[80px]" onClick={onClick}>
      <div className=" bg-[#fab1a0] h-[50px] w-[50px] rounded-full grid place-items-center cursor-pointer ">
        <BsChevronLeft />
      </div>
    </div>
  );
};

const PopularProduct = () => {
  const [progress, setProgress] = useState(0);
  const [slidesToShow, setSlideToShow] = useState(4);
  var settings = {
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (current) => {
      setProgress((100 / (data.length - slidesToShow + 1)) * (current + 1));
    },
  };
  return (
    <section className=" px-10 mb-10 ">
      <h1 className=" text-2xl mb-10">Popular Product</h1>
      <div className=" relative ">
        <Slider {...settings}>
          {data.map((each, index) => (
            <div className="w-[100%] shadow-2xl  mb-10" key={index}>
              <div className="relative h-[250px] w-full  mx-auto">
                <Image
                  src="/herosection.jpg"
                  className="absolute h-full w-full"
                  fill
                  alt="Product image"
                />
              </div>

              <h3>Product Name</h3>
              <p>Price </p>
            </div>
          ))}
        </Slider>
        <div className="h-[2px] bg-gray-300 w-[250px] absolute -top-[15px] right-0">
          <div
            className=" bg-[#fab1a0] absolute h-[100%] transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;
