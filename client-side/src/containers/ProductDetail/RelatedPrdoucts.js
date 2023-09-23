"use client";
import CardOne from "@/components/CardOne";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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

const RelatedPrdoucts = ({ data }) => {
  const settings = {
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
            <div className="px-2 ml-4 md:ml-0" key={`${idx}-related-products`}>
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
