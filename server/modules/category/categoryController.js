const categorySchema = require("./categorySchema");
const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");

const categoryController = {};
const internal = {};

internal.setHierarchy = async (req, parent_category, next) => {
  try {
    const category_hierarchy = [];
    let parent_category_change = parent_category;
    let set = true;
    if (parent_category) {
      while (set) {
        let category = await categorySchema.findOne({
          _id: parent_category_change,
        });
        if (category) {
          category_hierarchy.unshift(category._id);
          parent_category_change = category.parent_category;
          if (!parent_category_change) {
            parent_category_change = null;
            set = false;
          }
        } else {
          parent_category_change = null;
          set = false;
        }
      }
    }
    return category_hierarchy;
  } catch (err) {
    next(err);
  }
};

categoryController.addCategory = async (req, res, next) => {
  try {
    const category = req.body;
    category.category_hierarchy = await internal.setHierarchy(
      req,
      category.parent_category,
      next
    );
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
    } else {
      const url = await categorySchema.findOne({
        url: category.url,
        is_deleted: false,
        _id: { $ne: category._id },
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
      const isLoop = otherHelpers.mongoIdExistInArray(
        category.category_hierarchy,
        category._id
      );
      if (isLoop) {
        const errors = { parent_category: "Circular Dependencies detected" };
        return otherHelpers.sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          false,
          null,
          errors,
          "Invalid Call",
          null
        );
      }
      const update = await categorySchema.findOneAndUpdate(
        { _id: category._id, is_deleted: false },
        { $set: category },
        { new: true }
      );
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        update,
        null,
        "Category saved successfull.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

categoryController.deleteCategory = async (req, res, next) => {
  try {
    const category_id = req.params.id;
    const category = await categorySchema.findOne({
      _id: category_id,
      is_deleted: true,
    });
    if (category) {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        null,
        "Category not found.",
        null
      );
    } else {
      const deleted = await categorySchema.findOneAndUpdate(
        { _id: category_id, is_deleted: false },
        {
          $set: {
            is_deleted: true,
            is_active: false,
            deleted_at: new Date(),
            parent_category: null,
          },
        },
        { new: true }
      );
      await categorySchema.updateMany(
        {
          category_hierarchy: { $in: [category_id] },
        },
        {
          $set: {
            is_deleted: true,
            is_active: false,
            deleted_at: new Date(),
            parent_category: null,
          },
        }
      );
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        deleted,
        null,
        "Category delete successfull.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

categoryController.getCategory = async (req, res, next) => {
  try {
    let searchQuery = { is_deleted: false };
    if (req.query.find_title) {
      searchQuery = {
        ...searchQuery,
        title: { $regex: req.query.find_title, $options: "i" },
      };
    }
    const category = await categorySchema.find(searchQuery);
    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      category,
      null,
      "Category get successfull.",
      null
    );
  } catch (error) {
    next(error);
  }
};

categoryController.getCategoryList = async (req, res, next) => {
  try {
    let categoryParent = await categorySchema
      .find(
        { is_deleted: false, "category_hierarchy.0": { $exists: false } },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelOne = await categorySchema
      .find(
        {
          is_deleted: false,
          $and: [
            { "category_hierarchy.0": { $exists: true } },
            { "category_hierarchy.1": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelTwo = await categorySchema
      .find(
        {
          is_deleted: false,
          $and: [
            { "category_hierarchy.1": { $exists: true } },
            { "category_hierarchy.2": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelThree = await categorySchema
      .find(
        {
          is_deleted: false,
          $and: [
            { "category_hierarchy.2": { $exists: true } },
            { "category_hierarchy.3": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();

    for (let i = 0; i < categoryLevelTwo.length; i++) {
      categoryLevelTwo[i].child_category = categoryLevelThree.filter((x) => {
        if (
          categoryLevelTwo[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    for (let i = 0; i < categoryLevelOne.length; i++) {
      categoryLevelOne[i].child_category = categoryLevelTwo.filter((x) => {
        if (
          categoryLevelOne[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    for (let i = 0; i < categoryParent.length; i++) {
      categoryParent[i].child_category = categoryLevelOne.filter((x) => {
        if (
          categoryParent[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      categoryParent,
      null,
      "Category dropdown get success.",
      null
    );
  } catch (error) {
    next(error);
  }
};

categoryController.getSingleCategory = async (req, res, next) => {
  try {
    const category_id = req.params.category_id;

    const category = await categorySchema.findOne({
      _id: category_id,
      is_deleted: false,
    });

    if (category) {
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        category,
        null,
        "Category detail get success.",
        null
      );
    } else {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        "Category not found.",
        null
      );
    }
  } catch (error) {
    next(error);
  }
};

categoryController.getCategoryDropdown = async (req, res, next) => {
  try {
    let categoryParent = await categorySchema
      .find(
        {
          is_active: true,
          is_deleted: false,
          "category_hierarchy.0": { $exists: false },
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelOne = await categorySchema
      .find(
        {
          is_active: true,
          is_deleted: false,
          $and: [
            { "category_hierarchy.0": { $exists: true } },
            { "category_hierarchy.1": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelTwo = await categorySchema
      .find(
        {
          is_active: true,
          is_deleted: false,
          $and: [
            { "category_hierarchy.1": { $exists: true } },
            { "category_hierarchy.2": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();
    let categoryLevelThree = await categorySchema
      .find(
        {
          is_active: true,
          is_deleted: false,
          $and: [
            { "category_hierarchy.2": { $exists: true } },
            { "category_hierarchy.3": { $exists: false } },
          ],
        },
        {
          title: 1,
          _id: 1,
          parent_category: 1,
          category_hierarchy: 1,
          default_commission: 1,
        }
      )
      .sort({ title: 1 })
      .populate([{ path: "category_hierarchy", select: "title" }])
      .lean();

    for (let i = 0; i < categoryLevelTwo.length; i++) {
      categoryLevelTwo[i].child_category = categoryLevelThree.filter((x) => {
        if (
          categoryLevelTwo[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    for (let i = 0; i < categoryLevelOne.length; i++) {
      categoryLevelOne[i].child_category = categoryLevelTwo.filter((x) => {
        if (
          categoryLevelOne[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    for (let i = 0; i < categoryParent.length; i++) {
      categoryParent[i].child_category = categoryLevelOne.filter((x) => {
        if (
          categoryParent[i]._id.toString() == x.parent_category &&
          x.parent_category.toString()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return otherHelpers.sendResponse(
      res,
      httpStatus.OK,
      true,
      categoryParent,
      null,
      "Category dropdown get success.",
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = categoryController;
