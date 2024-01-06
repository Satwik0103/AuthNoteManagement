let apiStaticData={
    serviceType:{
       signUpProcess:"SIGNUP_PROCESS",
       bodyValidationsignUp:"REQBODY_VALIDATION_SIGNUP",
       bodyValidationLogin:"REQBODY_VALIDATION_LOGIN",
       loginProcess:"LOGIN_PROCESS"
    },
    mongotableName: {
        login:"Auth_Management",
      },
    responseCode: {
      Success: "200",
      Failure: "401",
      Error: "500" ,
      SessionExpireCode:"408"
    },
    responseMessage: {
        Success: "Success",
        somethingWentWrong: "Something went wrong",
        Login_successful: "Login Successful",
        SignUp_successful: "Sign UP Successful",
        loginFailureStatus: "UnAuthorized User.Please Sign In",
        credentialsMismatch:"Please enter correct userId and Password",
        existingUser:"Username or UserEmail already in use.Please provide different credentials"
    }
  }
module.exports=apiStaticData