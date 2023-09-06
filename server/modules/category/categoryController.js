const categorySchema = require("./categorySchema");
const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");

const categoryController = {};

categoryController.addCategory = async (req, res, next) => {
  try {
    const category = req.body;
    if (!category._id) {
      const url = await categorySchema.findOne({
        url: category.url,
        is_deleted: false,
      });
      if (url) {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_ACCEPTABLE,
          false,
          null,
          { url: "Category url already exists." },
          "Please add new category url.",
          null
        );
      }
      const newCategory = new categorySchema(category);
      const update = await newCategory.save();
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        update,
        null,
        "Category add successfull.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = categoryController;
