const express = require("express");
const router = express.Router();

// All route of Media
const files = require("./api/files");
router.use("/files", files);

// All route of Category
const category = require("./api/category");
router.use("/category", category);

module.exports = router;
