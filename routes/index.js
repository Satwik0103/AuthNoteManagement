const express = require("express");
const authEndPoint = require("../src/authEndPoint/routesConfig.js")
const noteEndPoint=require("../src/noteEndPoint/routesConfig.js")
const logger=require("../loggers/loggers")
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  if (currentHour === 0 && currentMinutes >= 0 && currentMinutes <= 30) {
    logger.info_posLoginLog("Login Process is Active");
  }
  return res.send({
    apiResponseCode: "200",
    apiResponeMessage: "success",
    apiResponseData: { responseCde: "200", responseMessage: "success" },
    apiResponseFrom: "Node Api",
    apiResponseTime: new Date().toLocaleString(),
  });
});
/***************************** add new routes here ****************************************/
router.use("/auth",authEndPoint);
router.use("/",noteEndPoint);


module.exports = router;
