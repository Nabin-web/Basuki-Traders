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

fileController.getAllFiles = async (req, res, next) => {
  try {
    let { page, size, searchQuery, sortQuery, populate, selectQuery } =
      otherHelpers.parseFilters(req, 25, false);

    selectQuery = "path filename originalname";
    let data = await otherHelpers.getQuerySendResponse(
      fileSchema,
      page,
      size,
      sortQuery,
      searchQuery,
      selectQuery,
      next,
      populate
    );
    return otherHelpers.paginationSendResponse(
      res,
      httpStatus.OK,
      true,
      data.data,
      "Files get successfull",
      page,
      size,
      data.totalData,
      sortQuery
    );
  } catch (err) {
    next(err);
  }
};

module.exports = fileController;
