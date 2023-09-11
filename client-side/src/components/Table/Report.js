import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Loader from "../../assets/img/loading_transparent.gif"
import "./table.css"

/* eslint-disable react/no-array-index-key */
function ReportTable({ ...props }) {
  const {
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
    total,
    overallTotal,
  } = props

  const handleSize = (value) => {
    handlePagination({
      ...pagination,
      size: value,
      page: 1,
    })
  }

  return (
    <div
      className={`bg-white overflow-x-auto ${
        disableOverflow === true ? "" : "overflow-hidden"
      } ${`${isDashboard ? "shadow-none" : ""}`} 
      ${`${isReview ? "shadow-none" : ""}`} ${`${
        ispublic ? "shadow-none" : ""
      }`}`}
    >
      <table
        className={`rnmttable w-full table overflow-auto table-auto
        ${`${isBlock ? "block" : ""}`}
        ${`${isReview ? "table" : ""}`}
        ${`${isscrollable ? "x-scroll" : ""}`}
        ${isTblsm ? "tblsm" : ""}`}
      >
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {isSN && (
                <th
                  className={`text-center ${
                    ispublic
                      ? "border px-2 py-2"
                      : "py-3 px-2 font-bold text-sm text-gray-800 border-b border-gray-300"
                  }`}
                  key="SerialNo."
                >
                  S.N.
                </th>
              )}
              {tableHead.map((prop, key) => (
                <th
                  className={`${
                    ispublic
                      ? "border px-2 py-2"
                      : "py-3 px-2 font-bold text-sm text-gray-800 border-b border-gray-300"
                  }
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

        {tableData.length > 0 ? (
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
                        ? "border px-2 py-1"
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
                        ? "border px-2 py-1"
                        : "px-2 py-1 text-sm border-gray-300 text-gray-800"
                    }`}
                    key={index}
                  >
                    {each}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {total &&
                total.map((each, idx) => (
                  <td
                    className={`
                    ${`${isReview ? "Review" : ""}`}
                    ${
                      ispublic
                        ? "border px-2 py-1"
                        : "px-2 py-1 text-sm border-gray-300 text-gray-800"
                    }`}
                    key={idx}
                  >
                    {typeof each === "string"
                      ? `${each.replace("-", " ")}`
                      : each}
                  </td>
                ))}
            </tr>
            <tr>
              {overallTotal &&
                overallTotal.map((each, idx) => (
                  <td
                    className={`
                    ${`${isReview ? "Review" : ""}`}
                    ${
                      ispublic
                        ? "border px-2 py-1"
                        : "px-2 py-1 text-sm border-gray-300 text-gray-800"
                    }`}
                    key={idx}
                  >
                    {typeof each === "string"
                      ? `${each.replace("-", " ")}`
                      : each}
                  </td>
                ))}
            </tr>
          </tbody>
        ) : (
          loading && (
            <tbody>
              <tr>
                <td colSpan={tableHead.length} className="py-2 text-center">
                  <img
                    src={Loader}
                    alt="loading"
                    className="inline-block w-8 h-8"
                  />
                </td>
              </tr>
            </tbody>
          )
        )}
      </table>
      {tableData.length < 1 && loading === false && (
        <p
          className={`${
            ispublic
              ? " text-center border-t-0 border px-2 py-1"
              : "px-2 py-1 text-sm border-gray-300 text-gray-800"
          }`}
        >
          {emptyDataMsg || "No Data Found"}
        </p>
      )}
      <table
        className={`w-full border border-t-0
       ${`${isReview ? "Review" : ""}`}
      ${ispublic ? "" : "border-t"}`}
      >
        <tbody className="w-full">
          <tr className="w-full">
            {pagination && handlePagination && (
              <td className="w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="p-2 inline-flex items-center">
                    <span className="text-xs">Show</span>{" "}
                    <select
                      className="inputbox text-xs w-12 p-0 mx-2"
                      style={{ height: "30px" }}
                      value={pagination.size || 10}
                      onChange={(e) => {
                        handleSize(e.target.value)
                      }}
                    >
                      {[5, 10, 25, 50, 100, 1000].map((each) => (
                        <option value={each} key={each}>
                          {each}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs">entries</span>
                    <div className="ml-2 flex items-center">
                      <span
                        onClick={() => {
                          if (1 === pagination.page) {
                            return
                          }
                          handlePagination({
                            ...pagination,
                            page: pagination.page - 1,
                          })
                        }}
                        className={`${
                          1 === pagination.page
                            ? "opacity-25 pointer-events-none"
                            : "hover:bg-primary hover:text-white"
                        } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1`}
                      >
                        <FaChevronLeft />
                      </span>
                      <span
                        onClick={() => {
                          if (
                            Math.ceil(
                              pagination.totalData / pagination.size,
                            ) === pagination.page
                          ) {
                            return
                          }
                          handlePagination({
                            ...pagination,
                            page: pagination.page + 1,
                          })
                        }}
                        className={`${
                          Math.ceil(pagination.totalData / pagination.size) ===
                          pagination.page
                            ? "opacity-25 pointer-events-none"
                            : "hover:bg-primary hover:text-white"
                        } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1`}
                      >
                        <FaChevronRight />
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="mr-5 text-xs">
                      Page {pagination.page} of{" "}
                      {Math.ceil(pagination.totalData / pagination.size)}
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
  )
}

ReportTable.defaultProps = {
  tableHeaderColor: "gray",
  handlePagination: () =>
    console.log("todo: make handlePagination function!!!"),
}

export default ReportTable
