const express = require("express");
const router = express.Router();
const authApis = require('./authEndpoint');
const headerValidation = require("./headerValidation");
const bodyValidation = require("./reqBodyValidation");

router.post("/signup", [
  bodyValidation.validatebodyDataForSignUp,
  authApis.signUp
]);
router.post("/login", [
  bodyValidation.validatebodyDataForLogin,
  authApis.login
]);


module.exports = router;
