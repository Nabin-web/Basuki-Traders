"use client";
import AdminHeader from "@/components/AdminHeader";
import InputWrapper from "@/components/Input";
import SelectWrapper from "@/components/Select";
import DynamicTable from "@/components/Table";
import { BASE_URL, fetcher, options } from "@/utils/Api";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import useSWR from "swr";

const CategoryManage = () => {
  const {
    data: categoryData,
    isLoading: loading,
    mutate: categoryListMutate,
  } = useSWR(
    { url: `${BASE_URL}category/dropdown`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  const data = categoryData?.data ?? [];

  console.log(categoryData);

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminHeader>Category Manage</AdminHeader>
      </div>
      <div className="flex mt-4 rounded-md border border-gray-300">
        <div className="w-56">
          {data?.length > 0 ? (
            <div className="bg-gray-700 text-xs p-4 text-white h-full">
              {data?.map((e, idx) => (
                <div key={e._id} className="flex items-center gap-2 mb-2">
                  <button className="">
                    <RiAddFill className="text-lg" />
                  </button>
                  {e.title}
                </div>
              ))}
            </div>
          ) : (
            <div>Categories not added.</div>
          )}
        </div>
        <div className="flex-1 p-4">
          <div className="text-sm mb-2">Category Details</div>
          <div className="grid grid-cols-2 gap-4">
            <InputWrapper label="Title" />
            <InputWrapper label="Url" />
            <SelectWrapper
              options={[]}
              label="Parent Category"
              labelClassName="text-xs"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManage;
