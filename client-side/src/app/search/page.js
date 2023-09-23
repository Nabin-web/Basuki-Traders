"use client";
import Button from "@/components/Button";
import CardOne from "@/components/CardOne";
import { SearchMainLoading } from "@/containers/Search/SearchLoading";
import { BASE_URL, fetcher, options } from "@/utils/Api";
import { queryHelper } from "@/utils/helpers";
import { Input, Pagination } from "@mantine/core";
import React, { useState } from "react";
import { RiFileCloseLine, RiSearch2Line } from "react-icons/ri";
import useSWR from "swr";

const SearchPage = () => {
  const [searchTxt, setSerchTxt] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="mt-6">
        <div className="text-xl flex items-center justify-center gap-2 font-semibold mb-4 text-center border-b border-gray-300 pb-3 mx-4 md:mx-0">
          <RiSearch2Line className="text-orange-500" />
          Search Results
        </div>
        <>
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
                <div className="flex justify-center items-center gap-2 text-gray-500">
                  <RiFileCloseLine />
                  Sorry your search did not match any results. Try searching
                  again.
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default SearchPage;
