const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fileSchema = new schema({
  originalname: { type: String, required: false },
  renamed_name: { type: String, required: false },
  encoding: { type: String, required: false },
  mimetype: { type: String, required: false },
  destination: { type: String, required: false },
  filename: { type: String, required: false },
  path: { type: String, required: false },
  size: { type: Number, required: false },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, required: false },
  added_at: { type: Date, default: Date.now },
});

module.exports = File = mongoose.model("file", fileSchema);
