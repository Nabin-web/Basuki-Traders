const express = require("express");
const router = express.Router();
const productController = require("../../modules/product/productController");
const validator = require("../../modules/product/productValidator");

router.post("/", validator.validateSaveProduct, productController.saveProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);

// public detail get api;
router.get("/public/:url_key", productController.getPublicDetails);

module.exports = router;
