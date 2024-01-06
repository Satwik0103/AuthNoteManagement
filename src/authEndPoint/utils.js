const apiStaticData = require("./apiStaticData");
const jwt = require('jsonwebtoken');
require('mongodb')
const utility = require("../commonUtils/utility");
const Mongocon = require("../../db/Connector")
const config=require("../../environment/environmentVar")

exports.checkMailId = (mailId) => {
  try {
    let regex  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailId.match(regex)) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

exports.verifyPassword=async(req,loginData)=>{
  let apiResponse
  try{
    if(req.body.userEmail=loginData.userEmail && req.body.password==loginData.password){
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.Success,
        responseData: {},
      };
      return apiResponse;
    }
    else{
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.credentialsMismatch,
        responseData: {},
      };
      return apiResponse;
    }

  }
  catch (error) {
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong ,
      responseData: {},
    };
    return apiResponse;
  }
}

exports.signUpData = async (req, res) => {
  let apiResponse
  try {
    let {username,userEmail}=req.body
    let authDb = Mongocon.LoginDB();
    let existingUser = await authDb.collection(apiStaticData.mongotableName.login).findOne({ $or: [{ username }, { userEmail }] });
      if (existingUser) {
        apiResponse = {
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.existingUser,
          responseData: {},
        };
        return apiResponse;
      }
      else{
        let authData=req.body
        authData.createdOn=utility.convertDatetime(Date.now())
        let signUpResp = await authDb.collection(apiStaticData.mongotableName.login).insertOne(req.body)
        if (signUpResp.acknowledged == true) {
          apiResponse = {
            responseCode: apiStaticData.responseCode.Success,
            responseMessage: apiStaticData.responseMessage.SignUp_successful,
            responseData: {},
          };
          return apiResponse;
        }
        else {
          apiResponse = {
            responseCode: apiStaticData.responseCode.Failure,
            responseMessage: apiStaticData.responseMessage.somethingWentWrong,
            responseData: {},
          };
          return apiResponse;
        }
      }
  } catch (error) {
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    return apiResponse;
  }
}

exports.loginData=async(req,res)=>{
  let apiResponse
  try{
    let authDb = Mongocon.LoginDB();
    let userEmail=req.body.userEmail
    let secretKey = config.secretKey
    let loginQuery={
      userEmail:userEmail
    }
    let loginData=await authDb.collection(apiStaticData.mongotableName.login).findOne(loginQuery)
    if (loginData === null || Object.keys(loginData).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.loginFailureStatus,
        responseData: {}
      }
      return apiResponse
    }
    let verificationStatus=await this.verifyPassword(req,loginData);
    if(verificationStatus.responseCode!="200"){
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.credentialsMismatch,
        responseData: {}
      }
      return apiResponse
    }
    else{
      let  accessToken = jwt.sign({ userEmail }, secretKey, { expiresIn: '1h' });
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.Login_successful,
        responseData: {
          accessToken:accessToken
        }
      }
      return apiResponse
    }
  }
  catch (error) {
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    return apiResponse;
  }
}