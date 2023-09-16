const express = require("express");
const router = express.Router();
const uploaderHelper = require("../../helpers/upload.helper");
const filesController = require("../../modules/files/fileController");

router.post(
  "/document/upload",
  uploaderHelper.uploadFiles("public/product", "single", "file", false),
  filesController.UploadFilesWithoutFolder
);

module.exports = router;
