require("dotenv").config();
const httpStatus = require("http-status");
const multer = require("multer");
const otherHelpers = require("./other.helpers");
const maxFileSize = process.env.maxFileSize || 10000000;
const uploaderHelper = {};

let mimeType = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg": "svg",
  "image/gif": "gif",
  "image/webp": "webp",
};

uploaderHelper.uploadFiles = (destinationPath, uploadType, fieldData) => {
  const temp = maxFileSize / (1024 * 1024);
  var storage = multer.diskStorage({
    destination: destinationPath,
    filename: async (req, file, cb) => {
      const randomString = await otherHelpers.generateRandomHexString(15);
      var cleanFilename = file.originalname.replace(/[\\/\\&\\?\\$\\%]/g, "");
      cb(null, randomString + "-" + cleanFilename);
    },
  });
  const uploader = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // check valid mime type;
      const isValid = !!mimeType[file.mimetype];
      let error = isValid
        ? null
        : new Error("Only images files are allowed!!.");
      cb(error, isValid);
    },
    limits: { fileSize: maxFileSize },
  });

  if (uploadType == "array") {
    var upload = uploader.array(fieldData[0], fieldData[1]);
  } else if (uploadType == "single") {
    var upload = uploader.single(fieldData);
  }

  return (fileUpload = (req, res, next) => {
    upload(req, res, function (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_ACCEPTABLE,
          false,
          error,
          null,
          `Filesize must be greater than ${temp}MB.`,
          null
        );
      } else {
        return otherHelpers.sendResponse(
          res,
          httpStatus.NOT_ACCEPTABLE,
          false,
          error,
          null,
          `${error.code}`,
          null
        );
      }
    });
  });
};

module.exports = uploaderHelper;
