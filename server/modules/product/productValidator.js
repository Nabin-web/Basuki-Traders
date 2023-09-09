const Joi = require("joi");
const { validateRequestBody } = require("../../helpers/validate.helpers");
const productSchema = require("./productSchema");
const isEmpty = require("../../validation/isEmpty");
const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");
Joi.objectId = require("joi-objectid")(Joi);

const validator = {};

validator.validateSaveProduct = async (req, res, next) => {
  try {
    const joiModel = Joi.object()
      .keys({
        name: Joi.string().required().label("Name"),
        url_key: Joi.string().required().label("Url key"),
        product_sku: Joi.string().required().label("Product sku"),
        price: Joi.number().required().label("Price"),
        sales_price: Joi.number().required().label("Sales price"),
        description: Joi.number().optional().label("Description"),
        category: Joi.objectId().required().label("Category"),
        image: Joi.objectId().required().label("Image"),
      })
      .unknown();
    let errors = await validateRequestBody(req, res, joiModel);
    let url_filter = { is_deleted: false, url_key: req.body.url_key };
    if (req.body._id) {
      url_filter = { ...url_filter, _id: { $ne: req.body._id } };
    }
    const already_url = await productSchema.findOne(url_filter);
    if (already_url && already_url._id) {
      errors = { ...errors, url_key: "Product url already exists." };
    }
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
