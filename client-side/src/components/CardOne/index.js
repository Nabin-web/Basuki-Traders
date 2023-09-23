"use client";
import { IMAGE_URL } from "@/utils/Api";
import { CURRENCY_SIGN } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

const CardOne = ({ product }) => {
  return (
    <div className="p-4 border border-gray-300">
      <Link
        prefetch={false}
        href={`/detail/${product.url_key}`}
        target="_blank"
      >
        <Image
          src={`${IMAGE_URL}${product.image?.path}`}
          alt={product?.image?.filename}
          width={200}
          height={300}
          className="object-contain w-full h-auto"
        />
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
