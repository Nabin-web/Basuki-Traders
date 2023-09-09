const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  added_at: { type: Date, required: false, default: Date.now() },
  deleted_at: { type: Date, required: false },
  is_active: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: false, default: false },
  parent_category: {
    type: schema.Types.ObjectId,
    required: false,
    ref: "category",
  },
  category_hierarchy: [
    { type: schema.Types.ObjectId, required: false, ref: "category" },
  ],
});

module.exports = category = mongoose.model("category", categorySchema);
