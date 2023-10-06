const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sales_price: { type: Number, required: true },
  description: {
    type: String,
    required: false,
  },
  is_active: {
    type: Boolean,
    required: false,
    default: false,
  },
  is_popular: {
    type: Boolean,
    required: false,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  added_at: { type: Date, required: false, default: Date.now() },
  deleted_at: { type: Date, required: false, default: Date.now() },
  category: { type: schema.Types.ObjectId, required: true, ref: "category" },
  product_type: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "productType",
  },
  url_key: { type: String, required: true },
  product_sku: { type: String, required: true },
  category_hierarchy: [
    {
      type: schema.Types.ObjectId,
      required: false,
      ref: "category",
      index: true,
    },
  ],
  image: { type: schema.Types.ObjectId, required: true, ref: "file" },
  weight: { type: String, required: true },
});

module.exports = Product = mongoose.model("product", productSchema);
