 const utils = require("./utils");
const apiStaticData = require("./apiStaticData");
const responseHandler = require("../commonUtils/responseHandler");
const logger = require("../../loggers/loggers");

exports.addNote = async (req, res) => {
  let apiResponseValue
  let apiResponse
  try {
    logger.info_addNoteLog(
      ` REQ TO ADD NOTE API >>>>> ${JSON.stringify(
        req.body
      )}`
    );
    let addNoteResponse = await utils.createNote(req, res);
    apiResponse = {
      serviceType: apiStaticData.serviceType.addNote,
      apiResponseData: addNoteResponse,
    };
    logger.info_addNoteLog(
      ` RES FROM ADD NOTE API >>>>> ${JSON.stringify(
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
      serviceType: apiStaticData.serviceType.addNote,
      apiResponseData: apiResponseValue,
    };

    logger.info_addNoteLog(
      ` RES FROM ADD NOTE API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  }
};

exports.getNotes = async (req, res) => {
  let apiResponseValue
  let apiResponse
  try {
    logger.info_getNoteLog(
      ` REQ TO GET NOTES API >>>>> ${JSON.stringify(
        req.user.userEmail
      )}`
    );
    let noteData = await utils.getNotes(req, res);
    apiResponse = {
      serviceType: apiStaticData.serviceType.getNote,
      apiResponseData: noteData,
    };

    logger.info_getNoteLog(
      ` RES FROM GET NOTES API >>>>> ${JSON.stringify(
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
      serviceType: apiStaticData.serviceType.getNote,
      apiResponseData: apiResponseValue,
    };

    logger.info_getNoteLog(
      ` RES FROM GET NOTES API >>>>> ${JSON.stringify(
        apiResponse
      )}`
    );
    return res.send(responseHandler.transform(apiResponse));
  }
};
exports.getNoteById = async (req, res) => {
    let apiResponseValue
    let apiResponse
    try {
      logger.info_getNoteByIdLog(
        ` REQ TO GET NOTE BY ID API >>>>> ${JSON.stringify(
          req.params.id
        )}`
      );
      let noteDetails = await utils.getNotesById(req, res);
      apiResponse = {
        serviceType: apiStaticData.serviceType.gteNoteById,
        apiResponseData: noteDetails,
      };
  
      logger.info_getNoteByIdLog(
        ` RES FROM GET NOTE BY ID API >>>>> ${JSON.stringify(
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
        serviceType: apiStaticData.serviceType.gteNoteById,
        apiResponseData: apiResponseValue,
      };
  
      logger.info_getNoteByIdLog(
        ` RES FROM GET NOTE BY ID API >>>>> ${JSON.stringify(
          apiResponse
        )}`
      );
      return res.send(responseHandler.transform(apiResponse));
    }
  };
exports.updateNoteById = async (req, res) => {
    let apiResponseValue
    let apiResponse
    try {
      logger.info_updateNoteByIdLog(
        ` REQ TO UPDATE NOTE BY ID API >>>>> ${JSON.stringify(
          req.params.id
        )}`
      );
      let noteDetails = await utils.updateNoteById(req, res);
      apiResponse = {
        serviceType: apiStaticData.serviceType.updateNoteById,
        apiResponseData: noteDetails,
      };
  
      logger.info_updateNoteByIdLog(
        ` RES FROM  UPDATE NOTE BY ID API >>>>> ${JSON.stringify(
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
        serviceType: apiStaticData.serviceType.updateNoteById,
        apiResponseData: apiResponseValue,
      };
  
      logger.info_updateNoteByIdLog(
        ` RES FROM  UPDATE NOTE BY ID API >>>>> ${JSON.stringify(
          apiResponse
        )}`
      );
      return res.send(responseHandler.transform(apiResponse));
    }
  };
exports.deleteNoteById = async (req, res) => {
    let apiResponseValue
    let apiResponse
    try {
      logger.info_deleteNoteByIdLog(
        ` REQ TO DELETE NOTE BY ID API >>>>> ${JSON.stringify(
          req.params.id
        )}`
      );
      let noteDetails = await utils.deleteNoteById(req, res);
      apiResponse = {
        serviceType: apiStaticData.serviceType.deleteNoteById,
        apiResponseData: noteDetails,
      };
  
      logger.info_deleteNoteByIdLog(
        ` RES FROM DELETE NOTE BY ID API >>>>> ${JSON.stringify(
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
        serviceType: apiStaticData.serviceType.deleteNoteById,
        apiResponseData: apiResponseValue,
      };
  
      logger.info_deleteNoteByIdLog(
        ` RES FROM DELETE NOTE BY ID API >>>>> ${JSON.stringify(
          apiResponse
        )}`
      );
      return res.send(responseHandler.transform(apiResponse));
    }
  };
exports.shareNote = async (req, res) => {
    let apiResponseValue
    let apiResponse
    try {
      logger.info_shareNoteLog(
        ` REQ TO SHARE NOTE API >>>>> ${JSON.stringify(
          req.body
        )}`
      );
      let shareNoteResponse = await utils.shareNote(req, res);
      apiResponse = {
        serviceType: apiStaticData.serviceType.shareNote,
        apiResponseData: shareNoteResponse,
      };
      logger.info_shareNoteLog(
        ` RES FROM SHARE NOTE API >>>>> ${JSON.stringify(
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
        serviceType: apiStaticData.serviceType.shareNote,
        apiResponseData: apiResponseValue,
      };
  
      logger.info_shareNoteLog(
        ` RES FROM SHARE NOTE API >>>>> ${JSON.stringify(
          apiResponse
        )}`
      );
      return res.send(responseHandler.transform(apiResponse));
    }
  };
exports.searchByKeyword=async(req,res)=>{
    let apiResponse
    try{
        logger.info_searchByKeywordLog(
            ` REQ TO SEARCH BY KEYWORD API >>>>> ${JSON.stringify(
              req.query.q
            )}`
          );
          let searchResponse = await utils.searchByKeyword(req, res);
          apiResponse = {
            serviceType: apiStaticData.serviceType.searchByKeyword,
            apiResponseData: searchResponse,
          };
          logger.info_searchByKeywordLog(
            ` RES FROM SEARCH BY KEYWORD API >>>>> ${JSON.stringify(
              apiResponse
            )}`
          );
          return res.send(responseHandler.transform(apiResponse));
    }
    catch (error) {
        apiResponseValue = {
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        };
        apiResponse = {
          serviceType: apiStaticData.serviceType.searchByKeyword,
          apiResponseData: apiResponseValue,
        };
    
        logger.info_searchByKeywordLog(
          ` RES FROM SEARCH BY KEYWORD API >>>>> ${JSON.stringify(
            apiResponse
          )}`
        );
        return res.send(responseHandler.transform(apiResponse));
      }
}