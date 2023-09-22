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
router.get("/public/related/:url_key", productController.getRelatedProducts);
router.get(
  "/public/list/popular/products",
  productController.getPopularProducts
);
router.get("/public/search/products", productController.searchProducts);

module.exports = router;
