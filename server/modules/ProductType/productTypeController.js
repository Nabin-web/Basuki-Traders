const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");
const productTypeSchema = require("./productTypeSchema");

const productTypeController = {};

productTypeController.saveType = async (req, res, next) => {
  try {
    const type = req.body;
    if (type.name == "") {
      delete type.name;
    }
    if (type._id) {
      type.updated_at = Date.now();
      const savedProductType = await productTypeSchema.findOneAndUpdate(
        {
          _id: type._id,
        },
        { $set: type },
        { new: true }
      );
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        savedProductType,
        null,
        "Product Type updated sucessfully.",
        null
      );
    } else {
      const newProductType = new productTypeSchema(type);
      const saveProductType = await newProductType.save();
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        saveProductType,
        null,
        "Product Type saved successfully.",
        null
      );
    }
  } catch (err) {
    next(err);
  }
};

////

productTypeController.getProductType = async (req, res, next) => {
  try {
    let searchQuery = { is_deleted: false };
    if (req.query.find_name) {
      searchQuery = {
        ...searchQuery,
        name: { $regex: req.query.find_name, $options: "i" },
      };
    }
    const productType = await productTypeSchema.find(searchQuery);
    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      productType,
      null,
      "ProudctType get successfull.",
      null
    );
  } catch (error) {
    next(error);
  }
};

productTypeController.getProductTypeDetail = async (req, res, next) => {
  try {
    const productType_id = req.params.id;

    if (productType_id) {
      const product = await productTypeSchema.findOne({
        _id: productType_id,
      });

      console.log({ product });
      if (product) {
        return otherHelpers.sendResponse(
          res,
          httpStatus.OK,
          true,
          product,
          null,
          "Product type get success.",
          null
        );
      } else {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_FOUND,
          false,
          null,
          null,
          "Product type not found.",
          null
        );
      }
    } else {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        null,
        "Product id is required.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

productTypeController.deleteProductType = async (req, res, next) => {
  try {
    const product_type_id = req.params.id;

    if (product_type_id) {
      const product = await productTypeSchema.findOne({
        _id: product_type_id,
      });
      if (product) {
        const deleted = await productTypeSchema.findOneAndUpdate(
          { _id: product_type_id },
          {
            $set: {
              is_deleted: true,
              deleted_at: new Date(),
              is_active: false,
            },
          },
          { new: true }
        );
        return otherHelpers.sendResponse(
          res,
          httpStatus.OK,
          true,
          deleted,
          null,
          "Product type deleted successfully.",
          null
        );
      } else {
        return otherHelpers.sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          false,
          null,
          null,
          "Product not found.",
          null
        );
      }
    } else {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        null,
        "Product id missing.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = productTypeController;
