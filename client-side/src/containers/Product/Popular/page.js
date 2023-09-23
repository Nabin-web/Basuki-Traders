"use client";
import BlurImage from "@/components/BlurImage";
import CardOne from "@/components/CardOne";
import { IMAGE_URL } from "@/utils/Api";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NextArrow = ({ onClick }) => {
  return (
    <button
      title="Previous"
      className="absolute -right-0 top-1/2 z-10 -translate-y-1/2"
      onClick={onClick}
    >
      <RiArrowRightLine className="text-white bg-orange-500 p-2 font-bold text-5xl rounded-full shadow-md opacity-60 hover:opacity-100 duration-200" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      title="Next"
      className="absolute top-1/2 z-10 -translate-y-1/2 -left-5"
      onClick={onClick}
    >
      <RiArrowLeftLine className="text-white bg-orange-500 p-2 font-bold text-5xl rounded-full shadow-md opacity-60 hover:opacity-100 duration-200" />
    </button>
  );
};

const PopularProduct = ({ popularData }) => {
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
  };

  return (
    <section className=" px-10 mb-10 ">
      <h1 className=" text-2xl mb-10">Popular Product</h1>
      <div className=" relative ">
        <Slider {...settings}>
          {popularData?.map((each, index) => (
            <div key={`popular-produts-${index}`}>
              <CardOne product={each} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PopularProduct;
