"use client";
import Button from "@/components/Button";
import DynamicTable from "@/components/Table";
import Joi from "joi";
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import InputWrapper from "@/components/Input";
import { ApiPost, BASE_URL, fetcher, options } from "@/utils/Api";
import useSWR from "swr";
import { errorBuildLvl1, queryHelper } from "@/utils/helpers";
import Checkbox from "@/components/Checkbox";
import moment from "moment/moment";
import { Button as mantineBtn, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import "./index.css";
import { toast } from "react-toastify";
import SelectWrapper from "@/components/Select";
import { RiSearch2Line } from "react-icons/ri";

const joiModal = Joi.object().keys({
  name: Joi.string().required().label("Product Type"),
});

const listActive = [
  { label: "All", value: "" },
  { label: "Active", value: "true" },
  { label: "In Active", value: "false" },
];
const ProductType = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [state, setState] = useState({
    name: "",
    is_active: false,
    loading: false,
    page: 1,
    size: 10,
    _id: "",
  });
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState({
    find_name: "",
    find_is_active: "",
  });

  const {
    data: productTypeData,
    isLoading: productTypeLoading,
    mutate,
  } = useSWR(
    {
      url: `${BASE_URL}product-type?page=${state.page}&size${state.size}`,
      headers: options,
    },
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleChange = (name) => (e) => {
    setState((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleDelete = async (id) => {
    const res = await ApiPost(`product-type/${id}`, null, "DELETE");
    if (res?.success) {
      toast.success(res?.msg);
      mutate({ url: `${BASE_URL}/product-type`, headers: options });
    } else {
      toast.warning(res?.msg);
    }
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    setState((prev) => ({ ...prev, [name]: event.target.checked }));
  };

  const handlePagination = ({ page, size }) => {
    setState((prev) => ({ ...prev, page, size }));
  };

  const handleEdit = async (id) => {
    open();
    const res = await ApiPost(`product-type/${id}`, null, "GET");
    setState((prev) => ({
      ...prev,
      name: res?.data?.name,
      is_active: res?.data?.is_active,
      _id: res?.data?._id,
    }));
  };

  const handleSaveType = async () => {
    const { error } = joiModal.validate(
      {
        name: state.name,
      },
      { abortEarly: false }
    );
    if (error) {
      const errorObj = errorBuildLvl1(error.details);
      setErrors(errorObj);
    } else {
      let data = state;
      if (state._id == "") {
        delete data._id;
      }
      setState({ ...state, loading: true });
      const res = await ApiPost("product-type", data);
      if (res?.success) {
        setState({ ...state, loading: false });
        mutate({ url: `${BASE_URL}/product-type`, headers: options });
        close();
        setState({ name: "", is_active: false });
      } else {
        console.log({ res });
        setErrors(res?.errors);
        setState({ name: "", is_active: false });
      }
    }
  };

  const handleChangeQuery = (name) => (event) => {
    console.log("here");
    setQuery((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loadWithQuery(query);
    }
  };

  const handleDropdown = (name) => (e) => {
    setQuery((prev) => ({ ...prev, [name]: e.value }));
  };

  const loadWithQuery = async (query) => {
    const qry = queryHelper(query);
    const res = await fetch(`${BASE_URL}product-type?${qry}`, {
      headers: options,
    }).then((res) => res.json());
    if (res?.success) {
      mutate(() => res, { revalidate: false });
    }
  };

  const handleSearch = () => {
    loadWithQuery(query);
  };

  const openDeleteModal = (id) =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete?</Text>,
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "black" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(id),
    });

  const tableData = productTypeData?.data?.map(
    ({ _id, name, is_active, added_at }) => [
      name,
      <>
        {is_active ? (
          <span className="bg-green-300 px-2 rounded-lg">Active</span>
        ) : (
          <span className="bg-red-300 px-2 rounded-lg">In-Active</span>
        )}
      </>,
      <>{moment(added_at).format("LL")}</>,
      <>
        <div className="flex">
          <button
            aria-label="Edit"
            className=" px-1 text-center leading-none"
            onClick={() => handleEdit(_id)}
          >
            <FaEdit />
          </button>

          <button
            className="ml-2 px-1 text-center leading-none"
            onClick={() => {
              openDeleteModal(_id);
            }}
          >
            <FaTrash className=" text-base text-red-400 hover:text-red-600" />
          </button>
        </div>
      </>,
    ]
  );

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add Product Type">
        <div className=" mb-4">
          <InputWrapper
            label="Product Type"
            value={state.name ?? ""}
            onChange={handleChange("name")}
            name="name"
            error={errors?.name}
          />
        </div>
        <div className=" mb-4">
          <Checkbox
            label={"Is active ?"}
            name={`Is active ?`}
            checked={state.is_active || false}
            onChange={handleCheckedChange("is_active")}
          />
        </div>

        <Button
          onClick={() => {
            if (!state.loading) {
              handleSaveType();
            }
          }}
        >
          {state.loading ? "Loading..." : "Add"}
        </Button>
      </Modal>

      <div className=" flex items-center justify-between mb-4">
        <div>Product Type</div>
        <div className=" ">
          <Button
            className="btn flex items-center gap-2 bg-success px-4 py-2 rounded-lg text-white "
            onClick={open}
          >
            <FaPlus className=" text-sm" /> Add
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 items-end mb-2">
        <InputWrapper
          label="Search by name"
          value={query?.find_name || ""}
          onChange={handleChangeQuery("find_name")}
          name="find_name"
          onKeyDown={handleKeyDown}
        />

        <SelectWrapper
          options={listActive || []}
          label="Search by product type"
          labelClassName="text-xs"
          onChange={handleDropdown("find_is_active")}
        />
        <Button
          className="btn bg-secondary px-3 py-2 rounded-lg text-white"
          leftIcon={<RiSearch2Line size={20} />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <DynamicTable
        tableHead={["Name", "Status", "Added at", "Action"]}
        tableData={tableData || []}
        // pagination={tablePagination}
        // handlePagination={handlePagination}
        emptyDataMsg="No Orders Found"
        loading={productTypeLoading}
        ispublic
        isSN
      />
    </div>
  );
};

export default ProductType;
