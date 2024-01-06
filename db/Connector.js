const { MongoClient } = require("mongodb");
const config = require("../environment/environmentVar");
const logs=require("../loggers/loggers")
var loginDb;
module.exports = {
  connectToServer: async (url) => {
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
      if (err) {
        logs.info_loginLog(
          `------ CAN NOT CONNECT TO MONGO DB URL ---------${err}`
        );
        console.log(err)
        console.log("------ CAN NOT CONNECT TO MONGO DB URL ---------");
        process.exit(1);
      } else {
        loginDb = client.db(`${config.mongo_auth_note_db_name}`);
        logs.info_loginLog(
          `------ CONNECTED TO MONGO DB URL ---------`
        );
        console.log("------CONNECTED TO MONGO DB URL ---------");
      }
    });
  },

  LoginDB: function () {
    return loginDb;
  }
}