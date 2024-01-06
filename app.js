const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./environment/environmentVar.js");
const mongoConnect=require("./db/Connector.js")
const indexRouter = require("./routes/index.js");
const cors = require("cors");
const app = express();
const logs=require("./loggers/loggers")
const rateLimit = require('express-rate-limit');

// -----------Middlewares-----------------------------------------------------
  
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });
  
  app.use(limiter);

//Middlewares ends -------------------------------------------------------------

// Index Routing starts

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

//Mongo DB connection
const start = async () => {
    try {
        mongoConnect.connectToServer(config.mongo_db_url);
        logs.info_loginLog(
            `AUTH AND NOTE Management app Started and listening on port ${config.PORT}!`
          );
        app.listen(config.PORT, config.host,
            () => console.log(`CliAuthModule.rapipay.com app Started and listening on port ${config.PORT}!`));
    } catch (error) {
        logs.info_loginLog(
            `--------Error in starting the application+error${error}`
          );
        console.log("--------Error in starting the application+error" + error + "--------")
    }
};
  start();

// error handler
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	return res.send({
		apiResponseCode: "500",
		apiResponseMessage: err.message,
		apiResponseFrom: "NODE",
		apiResponseTime: new Date().toLocaleString(),
		apiResponseData: {}
	});
});


module.exports = app;