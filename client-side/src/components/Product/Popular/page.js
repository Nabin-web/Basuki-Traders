"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BASE_URL, IMAGE_URL, fetcher, options } from "@/utils/Api";
import useSWR from "swr";

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const { data, mutate, isLoading } = useSWR(
    { url: `${BASE_URL}product`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  console.log({ data });

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
          {data?.data?.map((each, index) => (
            <div
              className="group transition duration-300 w-[100%] border rounded-lg border-gray-300 hover:text-orange-500  hover:border-orange-500 text-center mb-10 py-12"
              key={index}
            >
              <div className="relative h-[150px] w-2/3  mx-auto">
                <Image
                  src={`${IMAGE_URL}${each.image.path}`}
                  className="absolute h-full w-full"
                  fill
                  alt="Product image"
                />
              </div>

              <h3 className=" font-bold my-4">{each.name}</h3>
              <p className=" font-bold my-4 text-orange-400">
                Rs. {each.price}{" "}
              </p>

              <button className=" border border-gray-500 rounded-xl py-2 px-4 flex items-center gap-1 mx-auto group-hover:border-orange-500 ">
                Show Details <BsChevronRight />
              </button>
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
