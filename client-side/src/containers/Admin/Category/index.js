"use client";
import AdminHeader from "@/components/AdminHeader";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputWrapper from "@/components/Input";
import SelectWrapper from "@/components/Select";
import DynamicTable from "@/components/Table";
import { ApiPost, BASE_URL, fetcher, options } from "@/utils/Api";
import React, { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import useSWR from "swr";
import { getCategoryDropdown, parentCategoryNormalized } from "./helpers";
import Joi from "joi";
import { errorBuildLvl1, slugify } from "@/utils/helpers";

const joiModal = Joi.object().keys({
  title: Joi.string().required().label("Title"),
  url: Joi.string().required().label("Url"),
});

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

  const [one, setOne] = useState({
    title: "",
    url: "",
    description: "",
    is_active: false,
    parent_category: null,
  });
  const [errors, setErrors] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  const handleChange = (name) => (e) => {
    setOne((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors && errors[name] !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name == "title") {
      setOne((prev) => ({ ...prev, url: slugify(e.target.value) }));
    }
  };

  const handleChecked = (e) => {
    setOne((prev) => ({ ...prev, is_active: e.target.checked }));
  };

  const handleDropdown = (e) => {
    setOne((prev) => ({ ...prev, parent_category: e.value }));
  };

  const handleSaveCategory = async () => {
    const { error } = joiModal.validate(
      {
        title: one.title,
        url: one.url,
      },
      { abortEarly: false }
    );
    if (error) {
      const errorObj = errorBuildLvl1(error.details);
      setErrors(errorObj);
    } else {
      const res = await ApiPost("category/category", one);
      if (res?.success) {
        setOne({
          title: "",
          url: "",
          description: "",
          is_active: false,
          parent_category: null,
        });
        categoryListMutate({
          url: `${BASE_URL}category/dropdown`,
          headers: options,
        });
      } else {
        console.log(res, "res");
      }
    }
  };

  // console.log(categoryData);

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
            <InputWrapper
              label="Title"
              value={one.title ?? ""}
              onChange={handleChange("title")}
              name="title"
              error={errors?.title}
            />
            <InputWrapper
              label="Url"
              value={one.url ?? ""}
              onChange={handleChange("url")}
              name="url"
              error={errors?.url}
            />
            <SelectWrapper
              options={getCategoryDropdown(data) || []}
              label="Parent Category"
              labelClassName="text-xs"
              onChange={handleDropdown}
              placeholder="Select Parent Category"
              error={errors?.parent_category}
              value={
                parentCategoryNormalized(data)[one.parent_category] || null
              }
            />
            <div />
            <div className="text-xs">
              <label className="" htmlFor="description">
                Description
              </label>
              <textarea
                className="inputbox"
                id="description"
                type="text"
                value={one.description || ""}
                name="description"
                onChange={handleChange("description")}
              />
            </div>
            <div />
            <Checkbox
              label="Is Active"
              name="is_active"
              onChange={handleChecked}
              checked={one.is_active ?? false}
            />
            <div />
            <div className="w-1/2">
              <Button onClick={handleSaveCategory} loading={saveLoading}>
                Save Category
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManage;
