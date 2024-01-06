const apiStaticData = require("./apiStaticData");
require('mongodb')
const Mongocon = require("../../db/Connector")
const utility=require("../commonUtils/utility")


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

function generateUniqueNoteId(){
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  const uniqueId = `${timestamp}${random}`;
  return uniqueId;
}

exports.createNote = async (req, res) => {
  let apiResponse
  try {
    let userEmail=req.user.userEmail
    let authDb = Mongocon.LoginDB();
    let userData = await authDb.collection(apiStaticData.mongotableName.login).findOne({userEmail:userEmail});
    if (userData === null || Object.keys(userData).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.userDoesNotExist,
        responseData: {}
      }
      return apiResponse
    }
    else{
      let noteData=req.body
      let noteId=generateUniqueNoteId();
      noteData.noteId=noteId
      noteData.userEmail=userEmail
      noteData.sharedEmail=[]
      noteData.createdOn=utility.convertDatetime(Date.now())
      let noteResp  = await authDb.collection(apiStaticData.mongotableName.note).insertOne(noteData)
      if (noteResp.acknowledged == true) {
        apiResponse = {
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noteMessage,
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
      responseMessage: apiStaticData.responseMessage.somethingWentWrong ,
      responseData: {},
    };
    return apiResponse;
  }
}

exports.getNotes=async(req,res)=>{
  let apiResponse
  try{
    let authDb = Mongocon.LoginDB();
    let userEmail=req.user.userEmail
    let fetchNoteDataQuery=[
      {
        '$match': {
          '$or': [
            { 'userEmail': userEmail },
            { 'sharedEmail': { '$in': [userEmail] } }
          ]
        }
      }, {
        '$project': {
          '_id': 0, 
          'noteId': 1, 
          'note': 1
        }
      }
    ]
    let noteDetails=await authDb.collection(apiStaticData.mongotableName.note).aggregate(fetchNoteDataQuery).toArray()
    if (noteDetails === null || noteDetails.length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noNoteFound,
        responseData: {}
      }
      return apiResponse
    }
    else{
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.Success,
        responseData: {noteData:noteDetails}
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
exports.getNotesById=async(req,res)=>{
  let apiResponse
  try{
    let authDb = Mongocon.LoginDB();
    let noteId=req.params.id
    let queryFetchNoteByNoteId=
    {
      noteId: noteId
    } 
    let noteDetails=await authDb.collection(apiStaticData.mongotableName.note).findOne(queryFetchNoteByNoteId)
    if (noteDetails === null || Object.keys(noteDetails).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noNoteFound,
        responseData: {}
      }
      return apiResponse
    }
    else if (noteDetails.userEmail===req.user.userEmail || noteDetails.sharedEmail.includes(req.user.userEmail)){
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.Success,
        responseData: {
          noteId:noteDetails.noteId,
          note:noteDetails.note
        }
      }
      return apiResponse
    }
    else{
        apiResponse = {
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.invalidNote,
          responseData: {}
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
exports.updateNoteById=async(req,res)=>{
  let apiResponse
  try{
    let authDb = Mongocon.LoginDB();
    let noteId=req.params.id
    let queryFetchNoteByNoteId=
    {
      noteId: noteId
    } 
    let noteDetails=await authDb.collection(apiStaticData.mongotableName.note).findOne(queryFetchNoteByNoteId)
    if (noteDetails === null || Object.keys(noteDetails).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noNoteFound,
        responseData: {}
      }
      return apiResponse
    }
    
    else if (noteDetails.userEmail===req.user.userEmail || noteDetails.sharedEmail.includes(req.user.userEmail)){
      if(noteDetails.note==req.body.note){
        apiResponse = {
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.noteAlreadyUpdated,
          responseData: {}
        }
        return apiResponse
      }
      updatedQuery={
        $set:{
          note:req.body.note,
          modifiedOn:utility.convertDatetime(Date.now())
        }
    }
    let result=await authDb.collection(apiStaticData.mongotableName.note).updateOne(queryFetchNoteByNoteId,updatedQuery,{})
    if(result.modifiedCount===1){
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noteUpdatedSuccess,
        responseData: {}
      }
      return apiResponse
    }
    else{
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.updateNoteFailue,
        responseData: {}
      }
      return apiResponse
    }  
  }
  else {
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.invalidNote,
      responseData: {}
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
exports.deleteNoteById=async(req,res)=>{
  let apiResponse
  try{
    let authDb = Mongocon.LoginDB();
    let noteId=req.params.id
    let queryFetchNoteByNoteId=
    {
      noteId: noteId
    } 
    let noteDetails=await authDb.collection(apiStaticData.mongotableName.note).findOne(queryFetchNoteByNoteId)
    if (noteDetails === null || Object.keys(noteDetails).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noNoteFound,
        responseData: {}
      }
      return apiResponse
    }
    else if (noteDetails.userEmail===req.user.userEmail || noteDetails.sharedEmail.includes(req.user.userEmail)){
        queryFetchNoteById={
          noteId: noteId 
      }
      let result=await authDb.collection(apiStaticData.mongotableName.note).deleteOne(queryFetchNoteById)
      if(result.deletedCount===1){
        apiResponse = {
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.deleteNote,
          responseData: {}
        }
        return apiResponse
      }
      else{
        apiResponse = {
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.deleteNoteFailue,
          responseData: {}
        }
        return apiResponse
      }
    }
    else {
        apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.invalidNote,
        responseData: {}
      }
      return apiResponse
    }
  }catch (error) {
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    return apiResponse;
  }
}
exports.shareNote = async (req, res) => {
  let apiResponse
  try {
    let authDb = Mongocon.LoginDB();
    let noteId=req.params.id
    let queryFetchNoteByNoteId=
    {
      noteId: noteId
    } 
    let noteDetails=await authDb.collection(apiStaticData.mongotableName.note).findOne(queryFetchNoteByNoteId)
    if (noteDetails === null || Object.keys(noteDetails).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noNoteFound,
        responseData: {}
      }
      return apiResponse
    }
    else if (noteDetails.userEmail==req.user.userEmail || noteDetails.sharedEmail.includes(req.user.userEmail)){
    let {userEmail}=req.body
    let userData = await authDb.collection(apiStaticData.mongotableName.login).findOne({userEmail:userEmail});
    if (userData === null || Object.keys(userData).length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.invalidUser,
        responseData: {}
      }
      return apiResponse
    }
    else{
      let sharedEmail=noteDetails.sharedEmail
      if(!sharedEmail.includes(userEmail)){
      sharedEmail.push(userEmail)
      }
      querySharedEmail={
        $set:{
          sharedEmail:sharedEmail,
          modifiedOn:utility.convertDatetime(Date.now())
        }
      }
    let result=await authDb.collection(apiStaticData.mongotableName.note).updateOne(queryFetchNoteByNoteId,querySharedEmail,{})
    if(result.modifiedCount===1){
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.noteSharedSuccess,
        responseData: {}
      }
      return apiResponse
    }
    else{
      apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.failureSharing,
        responseData: {}
      }
      return apiResponse
    }
  }
  }
  else {
        apiResponse = {
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.invalidNote,
        responseData: {}
      }
      return apiResponse
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
exports.searchByKeyword=async(req,res)=>{
  try{
    let authDb=Mongocon.LoginDB()
    let searchTerm = req.query.q;
    let regex = new RegExp(searchTerm, "i"); 
    query = { note: { $regex: regex } };
    searchNoteData=await authDb.collection(apiStaticData.mongotableName.note).find(query).toArray();
    if (searchNoteData === null || searchNoteData.length === 0) {
      apiResponse = {
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.dataDoesNotExist,
        responseData: []
      }
      return apiResponse
    }
    apiResponse = {
      responseCode: apiStaticData.responseCode.Success,
      responseMessage: apiStaticData.responseMessage.Success,
      responseData: searchNoteData

    }
    return apiResponse;
  }
  catch(error){
    apiResponse = {
      responseCode: apiStaticData.responseCode.Failure,
      responseMessage: apiStaticData.responseMessage.somethingWentWrong,
      responseData: {},
    };
    return apiResponse;
  }
}