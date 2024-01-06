const utils = require("./utils");
const apiStaticData = require("./apiStaticData");
const responseHandler = require("../commonUtils/responseHandler");
const logger = require("../../loggers/loggers");
const crypto = require("crypto")


exports.signUp = async (req, res) => {
  let apiResponseValue
  let apiResponse
  try {
    logger.info_signUpLog(
      ` REQ TO SIGN UP API >>>>> ${JSON.stringify(
        req.body
      )}`
    );
    let signUpResponse = await utils.signUpData(req, res);
    apiResponse = {
      serviceType: apiStaticData.serviceType.signUpProcess,
      apiResponseData: signUpResponse,
    };
    logger.info_loginLog(
      ` RES FROM LOGIN API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  } catch (error) {
    apiResponseValue = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    apiResponse = {
      serviceType: apiStaticData.serviceType.signUpProcess,
      apiResponseData: apiResponseValue,
    };

    logger.info_signUpLog(
      ` RES FROM SIGN UP API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  }
};

exports.login = async (req, res) => {
  let apiResponseValue
  let apiResponse
  try {
    logger.info_loginLog(
      ` REQ TO LOGIN API >>>>> ${JSON.stringify(
        req.body
      )}`
    );
    let loginResponse = await utils.loginData(req, res);
    apiResponse = {
      serviceType: apiStaticData.serviceType.login,
      apiResponseData: loginResponse,
    };

    logger.info_loginLog(
      ` RES FROM LOGIN API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  } catch (error) {
    apiResponseValue = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    apiResponse = {
      serviceType: apiStaticData.serviceType.login,
      apiResponseData: apiResponseValue,
    };

    logger.info_loginLog(
      ` RES FROM LOGIN API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  }
};
