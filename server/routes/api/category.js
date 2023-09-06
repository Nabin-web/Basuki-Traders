const express = require("express");
const router = express.Router();
const categoryController = require("../../modules/category/categoryController");
const validator = require("../../modules/category/categoryValidator");

router.post("/category", validator.validate, categoryController.addCategory);

module.exports = router;
