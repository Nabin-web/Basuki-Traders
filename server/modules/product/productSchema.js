const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sales_price: { type: Number, required: true },
  description: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: true,
  },
  added_at: { type: Date },
  deleted_at: { type: Date },
});

module.exports = Product = mongoose.model("product", productSchema);
