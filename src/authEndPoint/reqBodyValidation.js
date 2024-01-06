const commonUtils = require("./utils");
const responseHandler = require("../commonUtils/responseHandler");
const apiStaticData = require("./apiStaticData");

exports.validatebodyDataForSignUp = (req, res, next) => {
  try {
    let {
      username,
      password,
      userEmail
    } = req.body;
    let err = 0;
    let errorMessage = "";
    if (username == null || username.trim().length == 0) {
      err = 1;
      errorMessage = "username should not be null or empty";
    } else if (password == null || password.trim().length == 0) {
      err = 1;
      errorMessage = "password should not be null or empty";
    } else if (userEmail == null || userEmail.trim().length == 0) {
      err = 1;
      errorMessage = "userEmail cannot be null or empty";
    } else if (!commonUtils.checkMailId(userEmail)) {
      err = 1;
      errorMessage = "Please Enter correct email id";
    } else {
      err = 0;
    }
    if (err) {
      let apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: errorMessage
      };
      return res.send(
        responseHandler.transform({
          serviceType: apiStaticData.serviceType.bodyValidationsignUp,
          apiResponseData: apiResponse,
        })
      );
    }
    next();
  } catch (error) {
    let apiResponse = {
      code: apiStaticData.responseCode.Error,
      message: apiStaticData.responseMessage.somethingWentWrong,
      serviceType: apiStaticData.serviceType.bodyValidationsignUp,
      apiResponseData: {},
    };
    return res.send(responseHandler.transform(apiResponse));
  }
};
exports.validatebodyDataForLogin = (req, res, next) => {
  try {
    let {
      password,
      userEmail
    } = req.body;
    let err = 0;
    let errorMessage = "";
    if (password == null || password.trim().length == 0) {
      err = 1;
      errorMessage = "password should not be null or empty";
    } else if (userEmail == null || userEmail.trim().length == 0) {
      err = 1;
      errorMessage = "userEmail cannot be null or empty";
    } else if (!commonUtils.checkMailId(userEmail)) {
      err = 1;
      errorMessage = "Please Enter correct userEmail";
    } else {
      err = 0;
    }
    if (err) {
      let apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: errorMessage
      };
      return res.send(
        responseHandler.transform({
          serviceType: apiStaticData.serviceType.bodyValidationLogin,
          apiResponseData: apiResponse,
        })
      );
    }
    next();
  } catch (error) {
    let apiResponse = {
      code: apiStaticData.responseCode.Error,
      message: apiStaticData.responseMessage.somethingWentWrong,
      serviceType: apiStaticData.serviceType.bodyValidationLogin,
      apiResponseData: {},
    };
    return res.send(responseHandler.transform(apiResponse));
  }
};
