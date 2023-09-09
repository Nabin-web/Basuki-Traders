const express = require("express");
const router = express.Router();
const productController = require("../../modules/product/productController");
const validator = require("../../modules/product/productValidator");

router.post("/", validator.validateSaveProduct, productController.saveProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);

module.exports = router;
