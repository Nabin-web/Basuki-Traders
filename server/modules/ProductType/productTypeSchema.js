const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productTypeSchema = new schema({
  name: { type: String, required: true },
  is_active: {
    type: Boolean,
    required: false,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  added_at: { type: Date, required: false, default: Date.now() },
  deleted_at: { type: Date, required: false, default: Date.now() },
});

module.exports = ProductType = mongoose.model("productType", productTypeSchema);
