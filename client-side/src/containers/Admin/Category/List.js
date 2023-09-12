"use client";
import Loader from "@/assets/loading_transparent.gif";
import Image from "next/image";
import { useState } from "react";
import {
  RiAddBoxLine,
  RiCheckboxIndeterminateLine,
  RiFile4Line,
} from "react-icons/ri";

const CategoryList = ({
  data,
  handleFetchSingleCatData,
  loading,
  handleClearOne,
}) => {
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = (key) => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };

  const handleClick = (id) => {
    handleFetchSingleCatData(id);
  };

  const categoryFunctn = (e, parentId = "") => (
    <ul key={`show-category-${e._id}`}>
      {e.child_category && e.child_category.length ? (
        <>
          <li
            key={e._id}
            className="pt-1 pb-1 px-2 cursor-pointer flex items-center capitalize text-gray-300 hover:text-white text-xs"
            onClick={() => handleSetClick(e._id)}
          >
            {openSet[e._id] ? (
              <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                <RiCheckboxIndeterminateLine className="text-white text-xs" />
              </div>
            ) : (
              <div className="flex items-center text-grey-darker text-gray-300 hover:text-white cursor-pointer">
                <RiAddBoxLine className="text-white text-xs" />
              </div>
            )}
            <div className="flex items-center">
              <span
                onClick={() => handleClick(e._id)}
                className="dropdown-title capitalize ml-2"
              >
                {e.title}
              </span>
            </div>
          </li>

          {!openSet[e._id] ? null : (
            <div className="list-reset pl-[22px]">
              {e.child_category.map((el) => (
                <div className="border-l border-gray-400" key={el._id}>
                  {categoryFunctn(el, e._id)}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {e._id === "" ? (
            <div
              //   onClick={() => handleChange('parent_category', parentId)}
              className="pt-1 pb-1 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-300 hover:text-white text-xs"
            >
              <RiAddBoxLine className="text-xs" />
              Add subcategory
            </div>
          ) : (
            <div
              onClick={() => handleClick(e._id)}
              className="pt-1 pb-1 pr-4 pl-4 cursor-pointer flex items-center capitalize text-gray-300 hover:text-white text-xs"
            >
              <RiFile4Line className="mr-2 text-xs" />
              {`${e.title}`}
            </div>
          )}
        </>
      )}
    </ul>
  );

  return (
    <>
      <div className="w-64 p-4 bg-gray-600">
        <button
          className="w-full py-2 border text-white text-xs border-gray-300 rounded-md text-center mb-4"
          onClick={handleClearOne}
        >
          Add New Category
        </button>
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full gap-3">
            <Image
              src={Loader}
              alt="loader"
              className="m-auto mt-10"
              height={40}
              width={40}
            />
            <div className="text-white text-xs">Loading categories...</div>
          </div>
        ) : (
          <div className="border-t border-gray-300 border-dotted pt-2">
            {data?.length > 0 ? (
              data.map((e) => <div key={e._id}>{categoryFunctn(e)}</div>)
            ) : (
              <div className="text-white text-xs">Categories not added.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
