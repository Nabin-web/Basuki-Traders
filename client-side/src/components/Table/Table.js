"use client";
import { useMemo } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Loader from "@/assets/loading_transparent.gif";
import "./table.css";

/* eslint-disable react/no-array-index-key */
function CustomTable({
  ispublic,
  isscrollable,
  isTblsm,
  isSN,
  isDashboard,
  isReview,
  classes,
  tableHead,
  tableData,
  tableHeaderColor,
  pagination,
  handlePagination,
  emptyDataMsg,
  loading,
  activeData,
  isBlock,
  headCss,
  disableOverflow,
  tableTotalData,
  nonSticky,
}) {
  const handleSize = (value) => {
    handlePagination({
      ...pagination,
      size: value,
      page: 1,
    });
  };

  //total height of sections other than table itself
  //possible sections - top header section & filter section
  const headerSection = document.getElementById("page-header");
  const filterSection = document.getElementById("page-filter");
  const totalHeight = useMemo(() => {
    let totalHeight = 0;
    if (headerSection) {
      totalHeight += headerSection.offsetHeight;
    }
    if (filterSection) {
      totalHeight += filterSection.offsetHeight;
    }
    return `${totalHeight + 120}px`;
  }, [headerSection, filterSection]);

  return (
    <div
      style={{
        maxHeight: nonSticky ? null : `calc(100vh - ${totalHeight})`,
      }}
      className={`bg-white text-sm -z-10 ${
        disableOverflow === true ? "overflow-hidden" : "overflow-auto"
      } ${`${isDashboard ? "shadow-none" : ""}`} 
      ${`${isReview ? "shadow-none" : ""}`} ${`${
        ispublic ? "shadow-none" : ""
      }`}`}
    >
      <table
        className={`rnmttable w-full relative table table-auto 
        ${isBlock ? "block" : ""}}
        ${isReview ? "table" : ""}
        ${isscrollable ? "x-scroll" : ""}
        ${isTblsm ? "tblsm" : ""}`}
      >
        {tableHead !== undefined ? (
          <thead
            className={`${
              nonSticky ? "" : "sticky -top-px"
            } shadow border-l border-gray-300 z-10`}
          >
            <tr>
              {isSN && (
                <th
                  className={`text-center ${
                    ispublic
                      ? "border-gray-300 border px-2 py-2"
                      : "py-3 px-2 font-bold text-sm text-gray-800 border border-gray-300"
                  } ${nonSticky ? "" : "sticky -top-px z-50 bg-white"}`}
                  key="SerialNo."
                >
                  S.N.
                </th>
              )}
              {tableHead.map((prop, key) => (
                <th
                  className={`${
                    ispublic
                      ? "border-gray-300 border-r border-t px-2 py-2"
                      : "py-3 px-2 font-bold text-sm text-gray-800 border border-gray-300"
                  } ${nonSticky ? "" : "sticky -top-px z-50 bg-white"}
                  ${
                    headCss && headCss[key] && headCss[key] !== ""
                      ? headCss[key]
                      : ""
                  }
                  `}
                  key={key}
                >
                  {prop}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        {loading ? null : tableData && tableData.length > 0 ? (
          <tbody>
            {tableData.map((prop, key) => (
              <tr
                key={key}
                className={`${
                  activeData &&
                  activeData.length > 0 &&
                  activeData[key][0] === false
                    ? "tblactive"
                    : ""
                }`}
              >
                {isSN && (
                  <td
                    className={`text-center  ${
                      ispublic
                        ? "border border-gray-300 px-2 py-1"
                        : "px-2 py-1 text-sm border-gray-300 text-gray-800"
                    }  `}
                    key="SN"
                  >
                    {pagination && pagination.page
                      ? pagination.page * pagination.size +
                        (key + 1) -
                        pagination.size
                      : key + 1}
                  </td>
                )}

                {prop.map((each, index) => (
                  <td
                    className={`
                  ${`${isReview ? "Review" : ""}`}
                  ${
                    ispublic
                      ? "border border-gray-300 px-2 py-1"
                      : "px-2 py-1 text-sm border-gray-300 text-gray-800"
                  }`}
                    key={index}
                  >
                    {each}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}

        {tableTotalData && tableTotalData.length ? (
          <tbody>
            {tableTotalData.map((each, index) => (
              <tr className="w-full" key={index}>
                {each.map((e, index) => (
                  <td className="border px-2 py-1 border-gray-300" key={index}>
                    {e}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {loading ? (
        <p className="text-center border-t-0 border text-sm border-gray-300 px-2 py-1">
          <img
            src={Loader}
            alt="loading"
            className="inline-block w-8 h-8 mr-3"
          />
          Loading Data...
        </p>
      ) : tableData.length <= 0 ? (
        <p className="text-center border-t-0 border text-sm border-gray-300 px-2 py-1">
          {emptyDataMsg || "No Data Found"}
        </p>
      ) : null}
      <table
        className={`w-full border-b bg-white ${
          nonSticky ? "" : "sticky -bottom-px "
        }
       ${isReview ? "Review" : ""}
      ${ispublic ? "" : "border-t"}`}
      >
        <tbody>
          <tr className="border-l border-gray-300 border-r">
            {pagination && handlePagination && (
              <td>
                <div className="flex justify-between items-center">
                  <div className="p-2 inline-flex items-center">
                    <span className="text-xs">Show</span>{" "}
                    <select
                      className="border border-gray-400 outline-none border-b-2 border-b-blue-600 text-xs w-12 p-0 mx-2"
                      style={{ height: "30px" }}
                      value={pagination.size || 10}
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
                    <div className="ml-2 flex gap-2 items-center">
                      <span
                        onClick={() => {
                          if (1 === pagination.page) {
                            return;
                          }
                          handlePagination({
                            ...pagination,
                            page: pagination.page - 1,
                          });
                        }}
                        className={`${
                          1 === pagination.page
                            ? "opacity-25 pointer-events-none"
                            : "hover:text-primary duration-200"
                        } rounded cursor-pointer inline-flex items-center text-xl justify-center ml-1`}
                      >
                        <RiArrowLeftLine />
                      </span>
                      <button
                        disabled={tableData.length <= 0}
                        onClick={() => {
                          if (
                            Math.ceil(
                              pagination.totalData / pagination.size
                            ) === pagination.page
                          ) {
                            return;
                          }
                          handlePagination({
                            ...pagination,
                            page: pagination.page + 1,
                          });
                        }}
                        className={`${
                          Math.ceil(pagination.totalData / pagination.size) ===
                          pagination.page
                            ? "opacity-25 pointer-events-none"
                            : "hover:text-primary duration-200"
                        } rounded cursor-pointer inline-flex items-center justify-center text-xl disabled:cursor-not-allowed`}
                      >
                        <RiArrowRightLine />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="mr-5 text-xs">
                      {tableData.length > 0 && (
                        <>
                          Page {pagination.page} of{" "}
                          {Math.ceil(pagination.totalData / pagination.size)}
                        </>
                      )}
                      <span className="pl-4">
                        Total Data : {pagination.totalData}
                      </span>
                    </span>
                  </div>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>{" "}
    </div>
  );
}

export default CustomTable;
