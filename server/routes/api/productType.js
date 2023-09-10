const express = require("express");
const router = express.Router();
const productTypeController = require("../../modules/ProductType/productTypeController");
const validator = require("../../modules/ProductType/productTypeValidator");

router.post(
  "/",
  validator.validateSaveProductType,
  productTypeController.saveType
);
router.delete("/:id", productTypeController.deleteProductType);
router.get("/", productTypeController.getProductType);
router.get("/:id", productTypeController.getProductTypeDetail);

module.exports = router;
