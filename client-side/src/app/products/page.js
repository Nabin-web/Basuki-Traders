"use client";
import Button from "@/components/Button";
import CardOne from "@/components/CardOne";
import Checkbox from "@/components/Checkbox";
import SelectWrapper from "@/components/Select";
import { SearchMainLoading } from "@/containers/Search/SearchLoading";
import { BASE_URL, fetcher, options } from "@/utils/Api";
import { queryHelper } from "@/utils/helpers";
import { Input, Pagination, Select, Skeleton } from "@mantine/core";
import React, { useState } from "react";
import { RiFileCloseLine, RiSearch2Line } from "react-icons/ri";
import useSWR from "swr";

const listType = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Popular", value: "is_popular" },
  { label: "UnPopular", value: "unpopular" },
];

const SearchPage = () => {
  const [searchTxt, setSerchTxt] = useState("");
  const [ids, setId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(false);

  const {
    data: searchData,
    isLoading,
    mutate,
  } = useSWR(
    {
      url: `${BASE_URL}product/public/search/products?size=10`,
      headers: options,
    },
    fetcher,
    { revalidateOnFocus: false }
  );

  const {
    data: categoryData,
    isLoading: categoryLoading,
    mutate: categoryMutate,
  } = useSWR(
    {
      url: `${BASE_URL}category/category/public/dropdown`,
      headers: options,
    },
    fetcher,
    { revalidateOnFocus: false }
  );

  const data = searchData?.data || [];
  const NoOfPages = Math.ceil(searchData?.totalData / 10);

  const handleChange = (e) => {
    setSerchTxt(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    handleSearchWithQuery(1);
  };

  const handleChangePage = (page) => {
    if (NoOfPages > 1) {
      handleSearchWithQuery(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchWithQuery = async (page) => {
    setLoading(true);
    const query = queryHelper({
      searchKey: searchTxt,
      page: page || searchData,
      size: searchData?.size || 10,
    });
    const res = await fetch(
      `${BASE_URL}product/public/search/products?${query}`,
      {
        headers: options,
      }
    ).then((res) => res.json());

    if (res?.success) {
      mutate(
        () => ({
          ...res,
          data: res.data || [],
        }),
        { revalidate: false }
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleChecked = (id) => async (e) => {
    if (e.target.checked) {
      let query = "";
      let newId = [...ids, id];
      newId.map((each, i) => {
        query = query + `${each}${newId.length - 1 === i ? "" : ","}`;
      });

      setCategoryFilter(true);
      setId((prev) => [...prev, id]);
      const res = await fetch(
        `${BASE_URL}product/public/search/products?size=10&find_category=${query}`,
        { headers: options }
      ).then((res) => res.json());
      if (res?.success) {
        setCategoryFilter(false);
        mutate(() => res, { revalidate: false });
      }
    } else {
      let query = "";
      let newId = ids.filter((each) => each !== id);
      newId?.map((each, i) => {
        query = query + `${each}${newId.length - 1 === i ? "" : ","}`;
      });

      setCategoryFilter(true);
      setId([...newId]);
      const res = await fetch(
        `${BASE_URL}product/public/search/products?size=10&find_category=${query}`,
        { headers: options }
      ).then((res) => res.json());
      if (res?.success) {
        setCategoryFilter(false);
        mutate(() => res, { revalidate: false });
      }
    }
  };

  const handleDropdown = async (value) => {
    const res = await fetch(
      `${BASE_URL}product/public/search/products?size=10&find_type=${value}`,
      { headers: options }
    ).then((res) => res.json());
    if (res?.success) {
      setCategoryFilter(false);
      mutate(() => res, { revalidate: false });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 mx-4 md:mx-0">
        <Input.Wrapper label="Search for products" className="mb-2">
          <Input
            icon={<RiSearch2Line size={20} />}
            placeholder="I'm searching for..."
            value={searchTxt || ""}
            onChange={handleChange}
            disabled={loading}
            onKeyDown={handleKeyDown}
          />
        </Input.Wrapper>
        <Button onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </div>

      <div className="mt-6 flex-1">
        <div className="flex gap-3 lg:gap-0 items-center justify-between  border-b border-gray-300 pb-3 mb-4 mx-4 md:mx-0">
          <div className="text-base lg:text-xl flex items-center gap-2 font-semibold  text-center">
            <RiSearch2Line className="text-primary" />
            {categoryFilter ? "Searching..." : "Search Results"}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">Sort :</div>
            <Select
              data={listType || []}
              placeholder="Select..."
              onChange={handleDropdown}
            />
          </div>
        </div>
        <div className=" md:flex md:gap-6">
          <div className="mx-4 lg:mx-0 mb-3 lg:mb-0">
            <h3>Related Categories</h3>
            {categoryLoading && (
              <div className="mt-3">
                <Skeleton height={12} radius="xl" />
                <Skeleton height={12} mt={6} radius="xl" />
                <Skeleton height={12} mt={6} radius="xl" />
                <Skeleton height={12} mt={6} radius="xl" />
              </div>
            )}
            <div className="lg:h-screen lg:overflow-y-scroll lg:flex lg:flex-col lg:items-start lg:gap-2 flex items-center gap-2 flex-wrap mx-2 ">
              {!categoryLoading &&
                categoryData?.data?.map((each) => (
                  <Checkbox
                    key={each?._id}
                    label={each?.title}
                    name={each?.title}
                    onChange={handleChecked(each?._id)}
                    checked={ids.includes(each?._id)}
                  />
                ))}
            </div>
          </div>
          <div className=" flex-1">
            {isLoading && <SearchMainLoading />}
            {data.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mx-4 md:mx-0">
                  {data.map((e) => (
                    <div key={`${e._id}-search`}>
                      <CardOne product={e} />
                    </div>
                  ))}
                </div>
                <div className="mx-auto w-full flex justify-center my-8">
                  <Pagination
                    styles={{
                      control: {
                        border: "none !important",
                        borderRadius: "100%",
                        "&[data-active]": {
                          backgroundColor: "#2563eb",
                          cursor: "default",
                          "&:hover": {
                            backgroundColor: "#2563eb !important",
                          },
                        },
                      },
                    }}
                    total={NoOfPages}
                    onChange={handleChangePage}
                  />
                </div>
                {}
              </>
            ) : (
              <>
                {!isLoading && !loading && (
                  <div className="flex justify-center items-center gap-2 text-gray-500 flex-col lg:flex-row pt-5 text-center lg:text-left mx-6 lg:mx-0">
                    <RiFileCloseLine />
                    Sorry your search did not match any results. Try searching
                    again.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
