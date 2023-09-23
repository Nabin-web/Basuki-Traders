"use client";
import BlurImage from "@/components/BlurImage";
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
            <Link
              prefetch={false}
              href={`/detail/${each.url_key}`}
              className="group transition duration-300 w-[100%] border rounded-lg border-gray-300 hover:text-orange-500  hover:border-orange-500 text-center mb-10 py-8 hover:cursor-pointer"
              key={`popular-${each._id}-${index}`}
            >
              <div className="relative h-[180px] w-2/3  mx-auto">
                <BlurImage image={`${IMAGE_URL}${each.image.path}`} />
              </div>

              <h3 className=" font-bold my-4 text-center w-56 mx-auto truncate">
                {each.name}
              </h3>
              <p className=" font-bold my-4 text-orange-400">
                Rs. {each.price}{" "}
              </p>

              <button className="flex justify-center w-full items-center gap-2 text-sm mt-8 hover:text-orange-500">
                Show Details <BsChevronRight />
              </button>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PopularProduct;