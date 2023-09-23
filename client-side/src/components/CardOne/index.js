"use client";
import { IMAGE_URL } from "@/utils/Api";
import { CURRENCY_SIGN } from "@/utils/constants";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import BlurImage from "../BlurImage";

const CardOne = ({ product, target }) => {
  return (
    <div className="group duration-200 w-full border rounded-lg border-gray-300 hover:border-orange-500 text-center mb-10 py-8 cursor-pointer ml-2 md:ml-0">
      <Link
        prefetch={false}
        href={`/detail/${product.url_key}`}
        target={target || "_self"}
      >
        <div className="relative h-[180px] w-2/3 mx-auto">
          <BlurImage image={`${IMAGE_URL}${product.image.path}`} />
        </div>
        <h3 className=" font-bold my-4 text-center w-56 mx-auto truncate">
          {product.name}
        </h3>
        {product?.price - product?.sales_price > 0 ? (
          <div className="text-center">
            <span>
              {CURRENCY_SIGN} {product.sales_price}{" "}
            </span>
            <span className="text-xs line-through text-gray-400">
              {CURRENCY_SIGN} {product.price}{" "}
            </span>
          </div>
        ) : (
          <div className="text-center">
            {CURRENCY_SIGN} {product?.price}{" "}
          </div>
        )}
        <button className="flex justify-center w-full items-center gap-2 text-sm mt-8 hover:text-orange-500">
          Show Details <BsChevronRight />
        </button>
      </Link>
    </div>
  );
};

export default CardOne;
