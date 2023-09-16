"use client";
import DynamicTable from "@/components/Table";
import { BASE_URL, IMAGE_URL, fetcher, options } from "@/utils/Api";
import { CURRENCY_SIGN, DATE_FORMAT } from "@/utils/constants";
import { commaNumber, queryHelper } from "@/utils/helpers";
import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  RiAddFill,
  RiDeleteBin5Line,
  RiEdit2Fill,
  RiPencilFill,
} from "react-icons/ri";
import { toast } from "react-toastify";
import useSWR from "swr";

const ProductListing = () => {
  const router = useRouter();
  const { data, mutate, isLoading } = useSWR(
    { url: `${BASE_URL}product`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  const [queryVal, setQueryVal] = useState({
    page: 1,
    size: 10,
  });

  const handlePagination = ({ page, size }) => {
    setQueryVal({ page, size });
    loadWithQuery({ page, size });
  };

  const handleEdit = (id) => {
    router.push(`/admin/products-manage/edit/${id}`);
  };

  const handleAdd = () => {
    router.push("/admin/products-manage/add");
  };

  const loadWithQuery = async (query) => {
    const qry = queryHelper(query);
    const res = await fetch(`${BASE_URL}product?${qry}`, {
      headers: options,
    }).then((res) => res.json());
    if (res?.success) {
      mutate(() => res, { revalidate: false });
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${BASE_URL}product/${id}`, {
      method: "DELETE",
      headers: options,
    }).then((res) => res.json());
    if (res?.success) {
      toast.success(res?.msg || "Product delete successfull.");
      mutate(
        (prev) => ({
          ...prev,
          data: prev.data.filter((e) => e._id !== res?.data?._id),
          page: prev.page - 1,
          size: prev.size - 1,
          totalData: prev.totalData - 1,
        }),
        { revalidate: false }
      );
    } else {
      toast.warning(res?.msg || "Product delete failure.");
    }
  };

  const openDeleteModal = (id) =>
    modals.openConfirmModal({
      title: "Delete file",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure to delete this file? You cannot undo this action.
        </Text>
      ),
      labels: { confirm: "Confirm Delete", cancel: "Cancel" },
      confirmProps: { color: "black" },
      onCancel: () => setDltOpen(false),
      onConfirm: () => handleDelete(id),
    });

  const pagination = {
    page: data?.page || 1,
    size: data?.size || 10,
    totalData: data?.totalData || 0,
  };

  const tableData =
    data?.data?.length > 0
      ? data.data.map(
          ({
            _id,
            image,
            is_active,
            price,
            sales_price,
            product_sku,
            url_key,
            name,
            added_at,
            category,
            product_type,
          }) => [
            <div className="w-20 h-20">
              {image?.path ? (
                <img
                  src={`${IMAGE_URL}${image.path}`}
                  alt={image.filename}
                  className="object-contain w-full h-full"
                />
              ) : (
                "-"
              )}
            </div>,
            <Link
              className="text-blue-500 hover:text-blue-600 hover:underline"
              prefetch={false}
              href={`/detail/${url_key}`}
              target="_blank"
            >
              {name}
            </Link>,
            product_sku,
            <div>
              {CURRENCY_SIGN} <span>{commaNumber(price)}</span>
            </div>,
            <div>
              {CURRENCY_SIGN} <span>{commaNumber(sales_price)}</span>
            </div>,
            <>{category?.title ?? "-"}</>,
            <>{product_type?.name ?? "-"}</>,
            added_at ? moment(added_at).format(DATE_FORMAT) : "-",
            <>
              {is_active ? (
                <span className="bg-green-300 px-2 rounded-lg">Active</span>
              ) : (
                <span className="bg-red-300 px-2 rounded-lg">In-Active</span>
              )}
            </>,
            <>
              <div className="flex">
                <button
                  aria-label="Edit"
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => handleEdit(_id)}
                >
                  <RiPencilFill />
                </button>

                <button
                  className="ml-2 px-1 text-center leading-none"
                  onClick={() => {
                    openDeleteModal(_id);
                  }}
                >
                  <RiDeleteBin5Line className=" text-base text-red-400 hover:text-red-600" />
                </button>
              </div>
            </>,
          ]
        )
      : [];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>Product Manage</div>
        <Button
          className="btn bg-secondary px-4 py-2 rounded-lg text-white"
          leftIcon={<RiAddFill size={20} />}
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </div>
      <DynamicTable
        tableData={tableData}
        emptyDataMsg="Products not found."
        tableHead={[
          "Image",
          "Name",
          "SKU",
          "Price",
          "Sales Price",
          "Category",
          "Product Type",
          "Added At",
          "Status",
          "Actions",
        ]}
        pagination={pagination}
        handlePagination={handlePagination}
        loading={isLoading}
        ispublic
        isSN
      />
    </>
  );
};

export default ProductListing;
