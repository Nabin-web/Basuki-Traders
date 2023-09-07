const Joi = require("joi");
const categorySch = require("./categorySchema");
const { validateRequestBody } = require("../../helpers/validate.helpers");
const isEmpty = require("../../validation/isEmpty");
const otherHelper = require("../../helpers/other.helpers");
const httpStatus = require("http-status");

const validation = {};

validation.validate = async (req, res, next) => {
  try {
    const joiModel = Joi.object()
      .keys({
        title: Joi.string().required().label("Title"),
        url: Joi.string().required().label("Url"),
      })
      .unknown();
    let errors = await validateRequestBody(req, res, joiModel);
    let url_filter = { is_deleted: false, url: req.body.url };
    if (req.body._id) {
      url_filter = { ...url_filter, _id: { $ne: req.body._id } };
    }
    const already_url = await categorySch.findOne(url_filter);
    if (already_url && already_url._id) {
      errors = { ...errors, url: "Url already exist" };
    }
    if (!isEmpty(errors)) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        errors,
        "input errors",
        null
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validation;
