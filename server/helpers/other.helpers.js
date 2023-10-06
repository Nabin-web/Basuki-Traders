"use strict";
const crypto = require("crypto");

const otherHelpers = {};

otherHelpers.sendResponse = (
  res,
  status,
  success,
  data,
  errors,
  msg,
  token
) => {
  const response = {};
  if (success != null) response.success = success;
  if (status != null) response.status = status;
  if (data != null) response.data = data;
  if (errors != null) response.errors = errors;
  if (msg != null) response.msg = msg;
  if (token != null) response.token = token;
  return res.status(status).json(response);
};

otherHelpers.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};

otherHelpers.mongoIdExistInArray = (mongodbIdArray, mongoDbId) => {
  for (let i = 0; i < mongodbIdArray.length; i++) {
    if (mongodbIdArray[i].toString() === mongoDbId.toString()) return true;
  }
  return false;
};

otherHelpers.paginationSendResponse = (
  res,
  status,
  success,
  data,
  msg,
  pageNo,
  pagesize,
  totalData,
  sort
) => {
  const response = {};
  if (data) response.data = data;
  if (success !== null) response.success = success;
  if (msg) response.msg = msg;
  if (pageNo) response.page = pageNo;
  if (pagesize) response.size = pagesize;
  if (sort) response.sort = sort;
  if (typeof totalData === "number") response.totalData = totalData;
  return res.status(status).json(response);
};
otherHelpers.getQuerySendResponse = async (
  model,
  page,
  size,
  sortQuery,
  searchQuery,
  selectQuery,
  next,
  populate
) => {
  let pulledData = {};
  try {
    let [data, totalData] = await Promise.all([
      model
        .find(searchQuery)
        .select(selectQuery)
        .sort(sortQuery)
        .skip((page - 1) * size)
        .limit(size * 1)
        .populate(populate)
        .lean(),
      model.countDocuments(searchQuery),
    ]);
    return { data, totalData: totalData ? totalData : 0 };
  } catch (err) {
    next(err);
  }
};

otherHelpers.parseFilters = (req, defaults, is_deleted, default_sort) => {
  const size_default = defaults ? defaults : 10;
  let page;
  let size;
  let sortQuery = { _id: -1 };
  let sort_key;
  let searchQuery = {};
  let populate = [];
  let selectQuery = { __v: 0 };
  if (default_sort) {
    sortQuery = default_sort;
  }
  if (is_deleted === undefined) {
  } else if (is_deleted === null) {
  } else {
    if (!isNaN(is_deleted)) {
      searchQuery = { ...searchQuery, is_deleted: is_deleted };
      selectQuery = {
        ...selectQuery,
        is_deleted: 0,
        deleted_at: 0,
        deleted_by: 0,
      };
    }
  }
  if (req.query.find_is_active && req.query.find_is_active.length >= 3) {
    let is_active = req.query.find_is_active == "true" ? true : false;
    searchQuery = { ...searchQuery, is_active: is_active };
  }
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size == "") {
    size = size_default;
  } else if (
    (req.query.size && !isNaN(req.query.size)) ||
    req.query.size >= 0
  ) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sort = req.query.sort.split(":");
    sort_key = sort[0];

    let sort_order = sort[1] === "desc" ? -1 : 1;
    sortQuery = { [sort_key]: sort_order };
  }
  return { page, size, sortQuery, searchQuery, selectQuery, populate };
};

module.exports = otherHelpers;
