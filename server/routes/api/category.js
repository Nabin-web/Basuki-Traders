const express = require("express");
const router = express.Router();
const categoryController = require("../../modules/category/categoryController");
const validator = require("../../modules/category/categoryValidator");

router.post("/category", validator.validate, categoryController.addCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.get("/category", categoryController.getCategory);
router.get("/admin/list", categoryController.getCategoryList);
router.get("/category/:category_id", categoryController.getSingleCategory);
router.get("/admin/dropdown", categoryController.getCategoryDropdown);

// public api
router.get(
  "/category/public/dropdown",
  categoryController.getCategoryPublicDropdown
);

module.exports = router;
