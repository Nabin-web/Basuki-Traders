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

module.exports = otherHelpers;
