const express = require("express");
const router = express.Router();

// product route;

// All route of Media
const files = require("./api/files");
router.use("/files", files);

module.exports = router;
