"use client";
import AdminHeader from "@/components/AdminHeader";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputWrapper from "@/components/Input";
import SelectWrapper from "@/components/Select";
import { ApiPost, BASE_URL, fetcher, options } from "@/utils/Api";
import { errorBuildLvl1, slugify } from "@/utils/helpers";
import Joi from "joi";
import { useState } from "react";
import useSWR from "swr";
import CategoryList from "./List";
import { getCategoryDropdown, parentCategoryNormalized } from "./helpers";

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
    { url: `${BASE_URL}category/admin/list`, headers: options },
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
  const [apiLoading, setApiLoading] = useState({
    saveLoading: false,
    dltLoading: false,
  });

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

  const handleFetchSingleCatData = async (id) => {
    const res = await fetch(`${BASE_URL}category/category/${id}`, {
      headers: options,
    }).then((res) => res.json());
    if (res?.success) {
      setOne(res.data);
    }
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
      setApiLoading((prev) => ({ ...prev, saveLoading: true }));
      const res = await ApiPost("category/category", one);
      if (res?.success) {
        setApiLoading((prev) => ({ ...prev, saveLoading: false }));
        handleClearOne();
        categoryListMutate({
          url: `${BASE_URL}category/dropdown`,
          headers: options,
        });
      } else {
        console.log(res, "res");
        setApiLoading((prev) => ({ ...prev, saveLoading: false }));
      }
    }
  };

  const handleClearOne = () => {
    setOne({
      title: "",
      url: "",
      description: "",
      is_active: false,
      parent_category: null,
    });
  };

  const handleDeleteCategory = async () => {
    if (one?._id) {
      setApiLoading((prev) => ({ ...prev, dltLoading: true }));
      const res = await ApiPost(`category/category/${one._id}`, null, "DELETE");
      if (res?.success) {
        handleClearOne();
        categoryListMutate({
          url: `${BASE_URL}category/dropdown`,
          headers: options,
        });
        setApiLoading((prev) => ({ ...prev, dltLoading: false }));
      } else {
        console.log(res);
        setApiLoading((prev) => ({ ...prev, dltLoading: false }));
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminHeader>Category Manage</AdminHeader>
      </div>
      <div className="flex mt-4 rounded-md border border-gray-300 overflow-hidden shadow-md">
        <CategoryList
          data={data}
          handleFetchSingleCatData={handleFetchSingleCatData}
          loading={loading}
          handleClearOne={handleClearOne}
        />
        <div className="flex-1 p-4">
          <div className="text-sm mb-4 border-b border-dashed pb-2">
            Category Details
          </div>
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
                className="inputbox h-20"
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
            <div className="flex gap-2">
              <Button
                onClick={handleSaveCategory}
                loading={apiLoading.saveLoading}
              >
                Save Category
              </Button>
              <Button
                className="bg-danger text-white text-center py-2 px-3 flex items-center justify-center text-xs rounded"
                onClick={handleDeleteCategory}
                loading={apiLoading.dltLoading}
              >
                Delete Category
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManage;
