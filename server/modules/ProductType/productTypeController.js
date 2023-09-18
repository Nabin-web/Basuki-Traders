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
    let { page, size, searchQuery, sortQuery, populate, selectQuery } =
      otherHelpers.parseFilters(req, 10, false);

    searchQuery = { is_deleted: false };
    if (req.query.find_name) {
      searchQuery = {
        ...searchQuery,
        name: { $regex: req.query.find_name, $options: "i" },
      };
    }
    if (req.query.find_is_active) {
      searchQuery = {
        ...searchQuery,
        is_active: req.query.find_is_active,
      };
    }

    const productType = await otherHelpers.getQuerySendResponse(
      productTypeSchema,
      page,
      size,
      sortQuery,
      searchQuery,
      selectQuery,
      next
    );

    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      productType.data,
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

productTypeController.getDropdown = async (req, res, next) => {
  try {
    const productTypes = await productTypeSchema
      .find({ is_active: true, is_deleted: false })
      .select("name");

    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      productTypes,
      null,
      "Product type dropdown success.",
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = productTypeController;
