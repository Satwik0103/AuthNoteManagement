const log4js = require("log4js");

let loginFlag = true;
let signUpFlag=true;
let addNoteFlag=true;
let getNoteFlag=true;
let getNoteByIdFlag=true;
let updateNoteByIdFlag=true;
let deleteNoteByIdFlag=true;
let shareNoteflag=true;
let searchByKeywordFlag=true;

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    AUTH_NOTE_MANAGEMENT: {
      type: "file",
      filename: "var/log/posLoginNode.log",
      pattern: ".yyyy-MM-dd",
      compress: true,
      maxLogSize: 10485760,
      backups: 5,
    } 
  },
  categories: {
    default: { appenders: ["out"], level: "info" },
    signUpLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" },
    loginLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    addNoteLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    getNoteLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    getNoteByIdLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    updateNoteByIdLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    deleteNoteByIdLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    shareNoteLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
    searchByKeywordLog: { appenders: ["AUTH_NOTE_MANAGEMENT"], level: "info" } ,
  },
  pm2: true,
});

const signUpLogger = log4js.getLogger("signUpLog");
const loginLogger = log4js.getLogger("loginLog");
const addNoteLogger = log4js.getLogger("addNoteLog");
const getNoteLogger = log4js.getLogger("getNoteLog");
const getNoteByIdLogger = log4js.getLogger("getNoteByIdLog");
const updateNoteByIdLogger = log4js.getLogger("updateNoteByIdLog");
const deleteNoteByIdLogger = log4js.getLogger("deleteNoteByIdLog");
const shareNoteLogger = log4js.getLogger("shareNoteLog");
const searchByKeywordLogger = log4js.getLogger("searchByKeywordLog");

exports.info_signUpLog = function (message) {
  if (signUpFlag) {
    signUpLogger.info(message);
  } else {
    return;
  }
};
exports.info_loginLog = function (message) {
  if (loginFlag) {
    loginLogger.info(message);
  } else {
    return;
  }
};
exports.info_addNoteLog = function (message) {
    if (addNoteFlag) {
        addNoteLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_getNoteLog = function (message) {
    if (getNoteFlag) {
        getNoteLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_getNoteByIdLog = function (message) {
    if (getNoteByIdFlag) {
        getNoteByIdLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_updateNoteByIdLog = function (message) {
    if (updateNoteByIdFlag) {
        updateNoteByIdLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_deleteNoteByIdLog = function (message) {
    if (deleteNoteByIdFlag) {
        deleteNoteByIdLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_shareNoteLog = function (message) {
    if (shareNoteflag) {
        shareNoteLogger.info(message);
    } else {
      return;
    }
  };
  exports.info_searchByKeywordLog = function (message) {
    if (searchByKeywordFlag) {
        searchByKeywordLogger.info(message);
    } else {
      return;
    }
  };