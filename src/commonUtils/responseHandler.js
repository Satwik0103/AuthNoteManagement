const utils = require("../commonUtils/utility");

exports.transform = (apiResponse) => {
  try {
    let responseVar = {
			apiResponseCode: apiResponse.code || "200",
			apiResponseMessage: apiResponse.message || "Success",
			apiResponseFrom: `NODE_${apiResponse.serviceType}`,
			apiResponseTime: utils.convertDatetime(Date.now()),
			apiResponseData: apiResponse.apiResponseData
		};
    return responseVar;
  } catch (error) {
    let responseVar = {
      apiResponseCode: "500",
      apiResponseMessage: "Can not intiate response" + error,
      apiResponseFrom: "Node_Transform Response",
      apiResponseTime: utils.convertDatetime(Date.now()),
      apiResponseData: {},
    };
    return responseVar;
  }
};
