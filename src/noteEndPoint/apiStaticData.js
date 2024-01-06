let apiStaticData={
    serviceType:{
       signUpProcess:"SIGNUP_PROCESS",
       bodyValidationsignUp:"REQBODY_VALIDATION_SIGNUP",
       bodyValidationLogin:"REQBODY_VALIDATION_LOGIN",
       loginProcess:"LOGIN_PROCESS",
       addNote:"ADD_NOTE",
       getNote:"GET_NOTE",
       gteNoteById:"GET_NOTE_BY_ID",
       updateNoteById:"UPDATE_NOTE_BY_ID",
       deleteNoteById:"DELETE_NOTE_BY_ID",
       shareNote:"SHARE_NOTE",
       searchByKeyword:"SEARCH_BY_KEYWORD",
       headerValidationAuthernticateUser:"HEADER_VALIDATION_AUTHENTICATE_USER",
       bodyValidationShareNote:"REQBODY_VALIDATION_SHARE_NOTE",
       bodyValidationAddUpdateNote:"REQBODY_VALIDATION_ADD_UPDATE_NOTE"
    },
    secretKey:"2HEB500B50252A2A43CF2F1F8C186AF3",
    mongotableName: {
        login:"Auth_Management",
        note:"Note_Management"
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
        existingUser:"Username or UserEmail already in use.Please provide different credentials",
        noteMessage:"Note Added Successfully",
        noteUpdatedSuccess:"Note Updated successfully",
        updateNoteFailue:"Note can not be updated",
        userDoesNotExist:"Invalid user",
        invalidUser:"Failure in sharing note.Invalid receiver useremail",
        noNoteFound:"No Note Exist for the Provided Id",
        authorizationEmptyMsg:"Authorization should not be null or empty",
        deleteNote:"Note Deleted Successfully",
        deleteNoteFailue:"Note can not be deleted",
        noteSharedSuccess:"Note shared successfully",
        failureSharing:"Failure in sharing note",
        unauthorizedUser:"Unauthorized User",
        invalidNote:"Invalid NoteId No note found for the  user",
        noteAlreadyUpdated:"Nothing to Update Note Already Updated"
    }
  }
module.exports=apiStaticData