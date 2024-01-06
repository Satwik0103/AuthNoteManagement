const commonUtils = require("./utils");
const responseHandler = require("../commonUtils/responseHandler");
const apiStaticData = require("./apiStaticData");
let config=require("../../environment/environmentVar")
const jwt = require('jsonwebtoken');

exports.checkForAuthenticatedUser=(req,res,next)=>{
    let apiResponse
    try{
        let secretKey=config.secretKey
        const token = req.header('Authorization');
        if (!token) {
          apiResponse={
            responseCode:apiStaticData.responseCode.Failure,
            responseMessage:apiStaticData.responseMessage.authorizationEmptyMsg,
            responseData:{}
          }
          return res.send(responseHandler.transform({
            serviceType: apiStaticData.serviceType.headerValidationAuthernticateUser,
            apiResponseData: apiResponse}))
        }
      
        jwt.verify(token, secretKey, (err, user) => {
          if (err) {
            apiResponse={
              responseCode:apiStaticData.responseCode.Failure,
              responseMessage:apiStaticData.responseMessage.unauthorizedUser,
              responseData:{}
            }
            return res.send(responseHandler.transform({
                serviceType: apiStaticData.serviceType.headerValidationAuthernticateUser,
                apiResponseData: apiResponse}))
          }
      
          req.user = user;
          next();
        });
      }
    catch (error) {
      apiResponse={
        responseCode:apiStaticData.responseCode.Failure,
        responseMessage:apiStaticData.responseMessage.somethingWentWrong,
        responseData:{}
      }
      return res.send(responseHandler.transform({
        serviceType: apiStaticData.serviceType.headerValidationAuthernticateUser,
        apiResponseData: apiResponse}))
    }
  }