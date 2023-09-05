const fileSchema = require("./fileSchema");
const otherHelpers = require("../../helpers/other.helpers");
const httpStatus = require("http-status");

const fileController = {};

fileController.UploadFilesWithoutFolder = async (req, res, next) => {
  try {
    if (req.file) {
      let file = req.file;
      file.renamed_name = file.originalname;
      const newFile = new fileSchema(file);
      const fileSave = await newFile.save();
      return otherHelpers.sendResponse(
        res,
        httpStatus.OK,
        true,
        {
          _id: fileSave._id,
          path: fileSave.path,
        },
        null,
        "File saved successfully.",
        null
      );
    } else {
      return otherHelpers.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        null,
        "File upload error.",
        null
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = fileController;
