"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL, IMAGE_URL, fetcher, options } from "@/utils/Api";
import useSWR from "swr";
import BlurImage from "../../components/BlurImage";
import { BsChevronRight } from "react-icons/bs";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { queryHelper } from "@/utils/helpers";
import Link from "next/link";
import CardOne from "@/components/CardOne";

const Products = () => {
  const [qeury, setQuey] = useState({
    page: 1,
    size: 2,
  });
  const [mainData, setMainData] = useState([]);
  const { data, mutate, isLoading } = useSWR(
    {
      url: `${BASE_URL}product?page=${qeury?.page}&size=${qeury?.size}`,
      headers: options,
    },
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    console.log("jere", data);
    if (data?.data) {
      setMainData((prev) => [...prev, ...data?.data]);
    }

    return () => setMainData([]);
  }, [data]);

  const handleViewMore = async () => {
    const qry = queryHelper({ page: qeury?.page + 1, size: 2 });
    setQuey((prev) => ({ ...prev, page: qeury?.page + 1 }));
    const res = await fetch(`${BASE_URL}product?${qry}`, { headers: options });
    console.log({ res });
    if (res?.success) {
      mutate(
        (data) => {
          const newData = {
            ...data,
            data: [...data?.data, ...res?.data],
          };
        },
        { revalidate: false }
      );
    }
  };

  return (
    <section className="px-10 mb-10 ">
      <h1 className="text-2xl mb-10">Popular Product</h1>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center flex-wrap gap-8">
        {mainData?.map((each, index) => (
          <div key={`products-${index}-${each._id}`}>
            <CardOne product={each} />
          </div>
        ))}
      </div>
      <div onClick={() => handleViewMore()} className="mt-6 text-center">
        <button className=" border border-gray-500 rounded-xl py-2 px-4 flex items-center gap-1 mx-auto group-hover:border-orange-500 ">
          {isLoading ? (
            <> Loading...</>
          ) : (
            <>
              <FaPlus /> View more
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default Products;
