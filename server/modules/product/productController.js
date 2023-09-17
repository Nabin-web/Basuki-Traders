const otherHelpers = require("../../helpers/other.helpers");
const productSchema = require("./productSchema");
const httpStatus = require("http-status");
const categorySchema = require("../category/categorySchema");

const productController = {};

productController.saveProduct = async (req, res, next) => {
  try {
    const product = req.body;
    if (product.product_type == "") {
      delete product.product_type;
    }
    if (product.category == "") {
      delete product.category;
    }
    if (product.category) {
      const cat = await categorySchema
        .findOne({ _id: product.category })
        .select({ category_hierarchy: 1 });
      if (cat) {
        product.category = cat._id;
        product.category_hierarchy = cat.category_hierarchy;
      }
    }
    if (product._id) {
      const url_key = await productSchema.findOne({
        url_key: product.url_key,
        is_deleted: false,
        _id: { $ne: product._id },
      });
      if (url_key) {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_ACCEPTABLE,
          fase,
          null,
          { url_key: "Product url already exists." },
          null
        );
      }

      const savedProduct = await productSchema.findOneAndUpdate(
        { _id: product._id, is_deleted: false },
        {
          $set: product,
        },
        { new: true }
      );
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        savedProduct,
        null,
        "Product saved sucessfully.",
        null
      );
    } else {
      const newProduct = new productSchema(product);
      const saveProduct = await newProduct.save();

      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        saveProduct,
        null,
        "Product saved successfully.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

productController.deleteProduct = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    if (product_id) {
      const product = await productSchema.findOne({
        _id: product_id,
        is_deleted: false,
      });
      if (product) {
        const deleted = await productSchema.findOneAndUpdate(
          { _id: product_id },
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
          "Product deleted successfully.",
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

productController.getProducts = async (req, res, next) => {
  try {
    let { page, size, searchQuery, sortQuery, populate, selectQuery } =
      otherHelpers.parseFilters(req, 10, false);

    if (req.query.find_name) {
      searchQuery = {
        ...searchQuery,
        name: {
          $regex: req.query.find_name,
          $options: "i",
        },
      };
    }

    if (req.query.find_is_active) {
      searchQuery = {
        ...searchQuery,
        is_active: req.query.find_is_active,
      };
    }

    if (req.query.find_category) {
      searchQuery = {
        ...searchQuery,
        category: req.query.find_category,
      };
    }

    if (req.query.find_product_type) {
      searchQuery = {
        ...searchQuery,
        product_type: req.query.find_product_type,
      };
    }

    selectQuery =
      "name price sales_price is_active added_at url_key product_sku image";
    populate = [
      { path: "image", select: "path filename" },
      { path: "category", select: "title" },
      { path: "product_type", select: "name" },
    ];

    let data = await otherHelpers.getQuerySendResponse(
      productSchema,
      page,
      size,
      sortQuery,
      searchQuery,
      selectQuery,
      next,
      populate
    );
    return otherHelpers.paginationSendResponse(
      res,
      httpStatus.OK,
      true,
      data.data,
      "Products get successfull.",
      page,
      size,
      data.totalData,
      sortQuery
    );
  } catch (error) {
    next(error);
  }
};

productController.getProductDetail = async (req, res, next) => {
  try {
    const product_id = req.params.id;

    if (product_id) {
      const product = await productSchema
        .findOne({
          _id: product_id,
          is_deleted: false,
        })
        .populate([{ path: "image", select: "path filename" }]);
      if (product) {
        return otherHelpers.sendResponse(
          res,
          httpStatus.OK,
          true,
          product,
          null,
          "Product get success.",
          null
        );
      } else {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_FOUND,
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
        "Product id is required.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

productController.getPublicDetails = async (req, res, next) => {
  try {
    const url_key = req.params.url_key;
    const product = await productSchema
      .findOne({ url_key: url_key, is_deleted: false, is_active: true })
      .populate([
        { path: "image", select: "path filename" },
        { path: "product_type", select: "name" },
        { path: "category", select: "title url" },
        { path: "category_hierarchy", select: "title url" },
      ]);
    if (product) {
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        product,
        null,
        "Product detail success.",
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
  } catch (error) {
    next(error);
  }
};

productController.getRelatedProducts = async (req, res, next) => {
  try {
    const url_key = req.params.url_key;

    if (url_key) {
      const product = await productSchema.findOne({
        url_key: url_key,
        is_deleted: false,
        is_active: true,
      });

      if (product) {
        let relatedProducts = await productSchema
          .find({
            category: product.category,
            is_deleted: false,
            is_active: true,
            url_key: { $ne: url_key },
          })
          .select("name price sales_price url_key image")
          .populate([{ path: "image", select: "filename path" }]);
        return otherHelpers.sendResponse(
          res,
          httpStatus.OK,
          true,
          relatedProducts,
          null,
          "Related products get success.",
          null
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
