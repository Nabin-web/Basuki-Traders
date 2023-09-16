"use client";
import {
  BASE_URL,
  IMAGE_URL,
  fetcher,
  multiPartPost,
  options,
} from "@/utils/Api";
import { queryHelper } from "@/utils/helpers";
import { Button } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiExternalLinkFill,
  RiImageFill,
  RiUploadCloud2Line,
} from "react-icons/ri";
import { toast } from "react-toastify";
import useSWR from "swr";

const MediaManage = () => {
  const dropRef = useRef(null);
  const [queryVal, setQueryVal] = useState({
    page: 1,
    size: 25,
  });

  const { data, mutate, isLoading } = useSWR(
    { url: `${BASE_URL}files`, headers: options },
    fetcher,
    { revalidateOnFocus: false }
  );

  const filesData = data?.data || [];
  const totalData = data?.totalData || 0;
  const size = data?.size || 25;
  const page = data?.page || 1;

  const handleUploadFile = async (files) => {
    const res = await multiPartPost("files/document/upload", {}, files);
    if (res?.data?.success) {
      toast.success(res?.data?.msg || "File upload successfull.");
    } else {
      toast.warning("File upload failure.");
    }
  };

  const handleSize = (value) => {
    setQueryVal((prev) => ({ ...prev, size: value }));
    loadWithQuery({
      page: queryVal.page,
      size: value,
    });
  };

  const loadWithQuery = async (query) => {
    const qry = queryHelper(query);
    // mutate({ url: `${BASE_URL}files?${qry}`, headers: options });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>Media Manage</div>
        <Dropzone
          openRef={dropRef}
          activateOnClick={false}
          styles={{ inner: { pointerEvents: "all" } }}
          onDrop={(files) => handleUploadFile(files)}
          style={{
            border: "none",
            padding: "0",
          }}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
        >
          <Button
            className="btn bg-secondary px-4 py-2 rounded-lg text-white"
            leftIcon={<RiUploadCloud2Line size={20} />}
            onClick={() => dropRef.current()}
          >
            Upload File
          </Button>
        </Dropzone>
      </div>
      <div
        className={`${isLoading ? "opacity-25" : ""} bg-white p-4 shadow-md`}
      >
        {filesData.length > 0 ? (
          <div className="grid grid-cols-4 w-full">
            {filesData.map((e) => (
              <div
                key={e._id}
                className="flex flex-col w-full text-center cursor-pointer overflow-hidden border items-center justify-center border-gray-300 px-4 py-10 opacity-80 hover:opacity-100 relative"
              >
                <img
                  src={`${IMAGE_URL}${e.path}`}
                  alt={e.filename}
                  className="w-full h-24 object-contain"
                />
                <div className="w-52 truncate mt-2 text-xs text-gray-700">
                  {e.originalname}
                </div>
                <Link
                  href={`${IMAGE_URL}${e.path}`}
                  target="_blank"
                  prefetch={false}
                  className="absolute top-2 right-4 bg-white p-2 shadow-md"
                >
                  <RiExternalLinkFill />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <RiImageFill />
            Files not found.
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 shadow-md">
        <div className="p-2 inline-flex items-center">
          <span className="text-xs">Show</span>{" "}
          <select
            className="inputbox text-xs w-12 p-0 mx-2"
            style={{ height: "36.5px" }}
            value={queryVal.size || 25}
            onChange={(e) => {
              handleSize(e.target.value);
            }}
          >
            {[5, 10, 25, 50, 100].map((each) => (
              <option value={each} key={each}>
                {each}
              </option>
            ))}
          </select>
          <span className="text-xs">entries</span>
          <div className="ml-2 flex items-center">
            <span
              onClick={() => {
                if (1 === page) {
                  return;
                }
                // handlePagination({
                //   size,
                //   page: page - 1,
                // });
              }}
              className={`${
                1 === page
                  ? "opacity-25 pointer-events-none"
                  : "hover:bg-primary hover:text-white"
              } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1 text-xl`}
            >
              <RiArrowLeftSFill />
            </span>
            <span
              onClick={() => {
                if (Math.ceil(totalData / size) === page) {
                  return;
                }
                // handlePagination({
                //   size,
                //   page: page + 1,
                // });
              }}
              className={`${
                Math.ceil(totalData / size) === page
                  ? "opacity-25 pointer-events-none"
                  : "hover:bg-primary hover:text-white"
              } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1 text-xl`}
            >
              <RiArrowRightSFill />
            </span>
          </div>
        </div>

        <div>
          <span className="mr-5 text-xs">
            Page {page} of {Math.ceil(totalData / size)}
            <span className="pl-4">Total Data : {totalData}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default MediaManage;
