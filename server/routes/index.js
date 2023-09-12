const express = require("express");
const router = express.Router();

// All route of Media
const filesRouter = require("./api/files");
router.use("/files", filesRouter);

// All route of Category
const categoryRoutes = require("./api/category");
router.use("/category", categoryRoutes);

// All route of product;
const productRoutes = require("./api/product");
router.use("/product", productRoutes);

const productTypeRoutes = require("./api/productType");
router.use("/product-type", productTypeRoutes);

module.exports = router;
