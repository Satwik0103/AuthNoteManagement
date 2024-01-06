const commonUtils = require("./utils");
const responseHandler = require("../commonUtils/responseHandler");
const apiStaticData = require("./apiStaticData");

exports.validatebodyDataToAddUpdateNote = (req, res, next) => {
  try {
    let {
      note
    } = req.body;
    let err = 0;
    let errorMessage = "";

    if (note == null||note.trim().length == 0) {
      err = 1;
      errorMessage = "note should not be null or empty";
    }  
    else {
      err = 0;
    }
    if (err) {
      let apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: errorMessage,
        responseData:{}
      };
      return res.send(
        responseHandler.transform({
          serviceType: apiStaticData.serviceType.bodyValidationAddUpdateNote,
          apiResponseData: apiResponse,
        })
      );
    }
    next();
  } catch (error) {
    let apiResponse = {
      code: apiStaticData.responseCode.Error,
      message: apiStaticData.responseMessage.somethingWentWrong,
      serviceType: apiStaticData.serviceType.bodyValidationAddUpdateNote,
      apiResponseData: {},
    };
    return res.send(responseHandler.transform(apiResponse));
  }
};
exports.validateBodyShareNote = (req, res, next) => {
  try {
    let {
      userEmail
    } = req.body;
    let err = 0;
    let errorMessage = "";

    if (userEmail == null||userEmail.trim().length == 0) {
      err = 1;
      errorMessage = "Receiver userEmail should not be null or empty";
    }
    else if(req.user.userEmail===userEmail){
      err = 1;
      errorMessage = "Receiver userId should not be same as sender id";
    }  
    else {
      err = 0;
    }
    if (err) {
      let apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: errorMessage,
        responseData:{}
      };
      return res.send(
        responseHandler.transform({
          serviceType: apiStaticData.serviceType.bodyValidationShareNote,
          apiResponseData: apiResponse,
        })
      );
    }
    next();
  } catch (error) {
    let apiResponse = {
      code: apiStaticData.responseCode.Error,
      message: apiStaticData.responseMessage.somethingWentWrong,
      serviceType: apiStaticData.serviceType.bodyValidationShareNote,
      apiResponseData: {},
    };
    return res.send(responseHandler.transform(apiResponse));
  }
};



