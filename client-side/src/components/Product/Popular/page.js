"use-client";
import Image from "next/image";
import React from "react";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PopularProduct = () => {
  return (
    <section>
      <h1>Popular Product</h1>
      <div className=" relative">
        {data.map((each, index) => (
          <div
            className="w-[100%] bg-[#fab1a0] shadow-xl text-center"
            key={index}
          >
            <div className="relative h-[250px] w-1/2  mx-auto">
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
      </div>
    </section>
  );
};

export default PopularProduct;
