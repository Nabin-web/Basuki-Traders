"use client";
import CardOne from "@/components/CardOne";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-14 z-10 -mt-6 flex cursor-pointer items-center justify-center bg-white shadow-md rounded-full p-4"
      onClick={onClick}
      aria-hidden={false}
    >
      <BsChevronRight className="text-2xl" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-12 z-10 -mt-6 flex cursor-pointer items-center justify-center bg-white shadow-md rounded-full p-4"
      onClick={onClick}
      aria-hidden={false}
    >
      <BsChevronLeft className="text-2xl" />
    </div>
  );
}

const RelatedPrdoucts = ({ data }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (data?.length > 0) {
    return (
      <div className="mt-10 mb-6">
        <div className="flex items-center justify-center py-2 font-bold mt-8 mb-6">
          <div className="text-3xl font-bold tracking-wider uppercase leading-[24.38px]">
            Related Products
          </div>
        </div>
        <Slider {...settings} className="ProductSliderSec sliderFix">
          {data.map((e, idx) => (
            <div className="px-2" key={`${idx}-related-products`}>
              <CardOne product={e} productIndex={idx} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return false;
};

export default RelatedPrdoucts;
