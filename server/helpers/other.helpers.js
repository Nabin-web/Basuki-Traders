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

module.exports = otherHelpers;
