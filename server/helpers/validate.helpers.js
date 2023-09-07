const isEmpty = require("../validation/isEmpty");
const httpStatus = require("http-status");
const Validator = require("validator");
const otherHelpers = require("./other.helpers");
const validationHelper = {};
const internal = {};

internal.buildUsefulErrorObject = (errors) => {
  let sendObject = {};
  if (errors) {
    let errorProcess = errors.detail ? errors.detail : errors;
    errorProcess.forEach((detail) => {
      let msg = `${detail.message.replace(/['"]/g, "")}`;
      if (detail.path.length > 1) {
        const keys = detail.path;
        let ref = sendObject;
        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          if (!ref[k]) {
            if (keys[i + 1] > -1) {
              ref[k] = [];
            } else {
              ref[k] = {};
            }
          }
          if (Number(keys[i]).toString() != "NaN") {
            if (i === keys.length - 1) {
              ref[k].push(msg);
            } else {
              ref = ref[k];
            }
          } else {
            if (i === keys.length - 1) {
              ref[k] = msg;
            } else {
              ref = ref[k];
            }
          }
        }
      } else {
        sendObject[detail.path[0]] = msg;
      }
    });
  }
  return sendObject;
};

validationHelper.validateRequestBody = (req, res, validationModule, opt) => {
  try {
    const options = opt || {
      abortEarly: false,
    };
    const validation = validationModule.validate(req.body, options);
    if (validation.error) {
      const errors = validation.error
        ? internal.buildUsefulErrorObject(validation.error.details)
        : null;
      return errors;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

validationHelper.validateRequestParams = (req, res, validationModule, opt) => {
  const options = opt || {
    abortEarly: false,
  };
  const validation = validationModule.validate(req.params, options);
  if (validation.error) {
    const errors = validation.error
      ? internal.buildUsefulErrorObject(validation.error)
      : null;
    return errors;
  } else {
    return null;
  }
};

validationHelper.validateRequestQuery = (req, res, validationModule, opt) => {
  try {
    const options = {
      abortEarly: false,
    };
    const validation = validationModule.validate(req.query, options);
    if (validation.error) {
      const errors = validation.error
        ? internal.buildUsefulErrorObject(validation.error.details)
        : null;
      return errors;
    } else {
      return null;
    }
  } catch (err) {
    throw new err(err);
  }
};

validationHelper.requireJsonData = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return otherHelpers.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      `Server requires application/json got ${req.headers["content-type"]}`,
      "Bad Request.",
      null
    );
  } else {
    next();
  }
};

validationHelper.requireMultipartFormData = (req, res, next) => {
  if (!req.headers["content-type"].includes("multipart/form-data")) {
    return otherHelpers.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      `Server requires multipart/form-data got ${req.headers["content-type"]}`,
      "Bad Request.",
      null
    );
  } else {
    next();
  }
};

validationHelper.validation = (data, validationArray) => {
  let errors = {};
  validationArray.forEach((validationObj) => {
    let value = data[validationObj.field];
    value = !isEmpty(value) ? value + "" : "";
    const validation = validationObj.validate;

    for (let i = 0; i < validation.length; i++) {
      const val = validation[i];
      switch (val.condition) {
        case "IsEmpty":
          if (Validator.isEmpty(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case "IsLength":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isLength(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsInt":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isInt(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsNumeric":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isNumeric(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsEqual":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.equals(val.option.one, val.option.two)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsMongoId":
          if (!Validator.isEmpty(value)) {
            if (!Validator.isMongoId(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case "IsIn":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isIn(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsDate":
          if (!Validator.isEmpty(value)) {
            if (!Validator.isISO8601(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case "IsEmail":
          if (!Validator.isEmpty(value)) {
            if (!Validator.isEmail(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case "IsBoolean":
          if (!Validator.isEmpty(value)) {
            if (!Validator.isBoolean(value.toString())) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case "IsAfter":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isAfter(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsBefore":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.IsBefore(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsJSON":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isJSON(value)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsJWT":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.IsJWT(value)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsURL":
          if (!Validator.isEmpty(value)) {
            if (val.option) {
              if (!Validator.isURL(value, val.option.protocols)) {
                errors[validationObj.field] = val.msg;
              }
            }
          }
          break;
        case "IsUppercase":
          if (!Validator.isEmpty(value)) {
            if (!Validator.isUppercase(value)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;

        case "IsProperKey":
          if (!Validator.isEmpty(value)) {
            var arr = [
              "`",
              "!",
              "@",
              ",",
              "#",
              "$",
              "%",
              "^",
              "&",
              "*",
              "(",
              ")",
              "+",
              "?",
              "/",
              "|",
              ".",
              "\\",
            ];
            arr.forEach((element) => {
              let temp = value.includes(element);
              if (temp) {
                errors[
                  validationObj.field
                ] = `this field cannot contain special character  ::  ${element}`;
              }
            });
          }
          break;
        default:
          break;
      }
      if (errors[validationObj.field]) {
        i = validation.length;
      }
    }
  });
  return errors;
};
validationHelper.requireJsonData = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return otherHelpers.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      `Server requires application/json got ${req.headers["content-type"]}`,
      "Bad Request.",
      null
    );
  } else {
    next();
  }
};
validationHelper.requireMultipartFormData = (req, res, next) => {
  if (req.headers["content-type"].includes("multipart/form-data")) {
    return otherHelpers.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      `Server requires multipart/form-data got ${req.headers["content-type"]}`,
      "Bad Request.",
      null
    );
  } else {
    next();
  }
};

module.exports = validationHelper;
