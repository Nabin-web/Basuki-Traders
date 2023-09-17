"use client";
import { BackButton } from "@/components/Button/BackButton";
import InputWrapper from "@/components/Input";
import SelectWrapper from "@/components/Select";
import { ApiPost, BASE_URL, IMAGE_URL, fetcher, options } from "@/utils/Api";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import {
  getCategoryDropdown,
  parentCategoryNormalized,
} from "../../Category/helpers";
import { Modal } from "@mantine/core";
import MediaManage from "../../Media";
import { RiDeleteBin5Line, RiImageAddFill } from "react-icons/ri";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductsAddEdit = ({ product_id }) => {
  const router = useRouter();
  const [one, setOne] = useState({
    name: "",
    price: "",
    sales_price: "",
    description: "",
    is_active: false,
    category: null,
    url_key: "",
    product_sku: "",
    image: null,
    product_type: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { data, isLoading, mutate } = useSWR(
    product_id
      ? { url: `${BASE_URL}product/${product_id}`, headers: options }
      : null,
    fetcher,
    { revalidateOnFocus: false, revalidateOnMount: true }
  );

  const { data: categoryData, isLoading: catLoading } = useSWR(
    { url: `${BASE_URL}category/dropdown`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: productTypeData, isLoading: productTypeLoading } = useSWR(
    { url: `${BASE_URL}product-type`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!isLoading && data?.success) {
      setOne({ ...data?.data });
    }
  }, [data]);

  const { listProductType, listProductTypeNormalized } = useMemo(() => {
    let listProductType = [];
    let listProductTypeNormalized = [];

    if (productTypeData?.data?.length > 0) {
      listProductType = productTypeData?.data?.map((e) => ({
        label: e.name,
        value: e._id,
      }));
      listProductTypeNormalized = listProductType.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.value]: curr,
        }),
        {}
      );
    }
    return { listProductType, listProductTypeNormalized };
  }, [productTypeLoading]);

  const handleChange = (name) => (e) => {
    setOne((prev) => ({ ...prev, [name]: e.target.value }));
    if (name == "name") {
      setOne((prev) => ({ ...prev, url_key: slugify(e.target.value) }));
    }
  };

  const handleCopyPrice = () => {
    setOne((prev) => ({ ...prev, sales_price: prev.price }));
  };

  const handleDropdown = (name) => (e) => {
    setOne((prev) => ({ ...prev, [name]: e.value }));
  };

  const handleSelectImage = (img) => {
    setOne((prev) => ({ ...prev, image: img }));
    setOpen(false);
  };

  const handleRemoveImg = () => {
    setOne((prev) => ({ ...prev, image: null }));
  };

  const handleChecked = (e) => {
    setOne((prev) => ({ ...prev, is_active: e.target.checked }));
  };

  const handleBack = () => {
    router.push("/admin/products-manage");
  };

  const handleSaveProduct = async () => {
    let data = {
      ...one,
      image: one.image?._id ? one.image._id : null,
    };
    setLoading(true);
    const res = await ApiPost(`product`, data);
    if (res?.success) {
      toast.success(res?.msg || "Product saved successfully.");
      handleBack();
      setLoading(false);
    } else {
      toast.warning(res?.msg || "Product save failure.");
      console.log(res);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal size="80%" opened={open} onClose={() => setOpen(false)} centered>
        <MediaManage isComponent handleSelectImage={handleSelectImage} />
      </Modal>
      <div className="flex items-center mb-4">
        <BackButton onClick={handleBack} />
        <div>{product_id ? "Edit" : "Add"} Product Details</div>
      </div>
      <div className="p-4 shadow-md">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <InputWrapper
            label="Product Name"
            value={one?.name || ""}
            onChange={handleChange("name")}
            name="name"
          />
          <InputWrapper
            label="Product Url Key"
            value={one?.url_key || ""}
            onChange={handleChange("url_key")}
            name="url_key"
            disabled
          />
        </div>
        <div className="mb-4">
          <InputWrapper
            label="Product SKU"
            value={one?.product_sku || ""}
            onChange={handleChange("product_sku")}
            name="product_sku"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-xs">
            <label className="" htmlFor="description">
              Product Description
            </label>
            <textarea
              className="inputbox h-20"
              id="description"
              type="text"
              value={one?.description || ""}
              name="description"
              onChange={handleChange("description")}
            />
          </div>
          <div className="text-xs">
            <div>Product Image</div>
            {one?.image?.path ? (
              <section className="border-2 cursor-pointer hover:bg-gray-100 border-gray-300 border-dashed rounded-md h-20 flex items-center justify-center gap-2 relative">
                <img
                  src={`${IMAGE_URL}${one.image.path}`}
                  alt={one.image.filename}
                  className="object-contain h-full"
                />
                <button
                  onClick={handleRemoveImg}
                  className="border text-danger hover:text-red-600 border-danger p-1 rounded-full absolute bottom-2 right-4"
                >
                  <RiDeleteBin5Line />
                </button>
              </section>
            ) : (
              <section
                className="border-2 cursor-pointer hover:bg-gray-100 border-gray-300 border-dashed rounded-md h-20 flex items-center justify-center gap-2"
                onClick={() => setOpen(true)}
              >
                <RiImageAddFill />
                Add Image
              </section>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <SelectWrapper
            options={getCategoryDropdown(categoryData?.data || []) || []}
            label="Product Category"
            labelClassName="text-xs"
            onChange={handleDropdown("category")}
            //   error={errors?.parent_category}
            value={
              parentCategoryNormalized(categoryData?.data || [])[
                one.category
              ] || null
            }
          />
          <SelectWrapper
            options={listProductType || []}
            label="Product Type"
            labelClassName="text-xs"
            onChange={handleDropdown("product_type")}
            //   error={errors?.parent_category}
            value={listProductTypeNormalized[one.product_type] || null}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <InputWrapper
            label="Product Price"
            value={one?.price || ""}
            onChange={handleChange("price")}
            name="price"
            type="number"
          />
          <InputWrapper
            label={
              <>
                <span>Product Sales Price</span>
                <span
                  onClick={handleCopyPrice}
                  className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer ml-2"
                >
                  (Copy Price)
                </span>
              </>
            }
            labelClassName="flex items-center"
            value={one?.sales_price || ""}
            onChange={handleChange("sales_price")}
            name="sales_price"
            type="number"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Checkbox
            label="Is Active"
            onChange={handleChecked}
            name="is_active"
            checked={one?.is_active || false}
          />
          <Button loading={loading} onClick={handleSaveProduct}>
            Save Details
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsAddEdit;
