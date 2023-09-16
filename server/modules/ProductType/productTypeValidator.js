const Joi = require("joi");
const { validateRequestBody } = require("../../helpers/validate.helpers");
const productTypeSchema = require("./productTypeSchema");
const isEmpty = require("../../validation/isEmpty");
const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");
// Joi.objectId = require("joi-objectid")(Joi);

const validator = {};

validator.validateSaveProductType = async (req, res, next) => {
  try {
    const joiModel = Joi.object()
      .keys({
        name: Joi.string().required().label("Product Type"),
      })
      .unknown();
    let errors = await validateRequestBody(req, res, joiModel);
    if (!isEmpty(errors)) {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        errors,
        "Input errors.",
        null
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validator;
