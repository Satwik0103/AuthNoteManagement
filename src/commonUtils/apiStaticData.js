let apiStaticData={
    serviceType:{
        configureGoogleAuth:"CONFIGURE_VALIDATE_GOOGLE_AUTH",
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
        forbiddenDevice:"Forbidden Device",
        invalidResponse:"Invalid Response"
    },
    packageName:"com.rapipay.mpos",
    appIntegrityUrl:"https://www.googleapis.com/auth/playintegrity",
    MEETS_DEVICE_INTEGRITY:"MEETS_DEVICE_INTEGRITY",
    MEETS_STRONG_INTEGRITY:"MEETS_STRONG_INTEGRITY",
    MEETS_BASIC_INTEGRITY:"MEETS_BASIC_INTEGRITY",
    LICENSED:"LICENSED",
    PLAY_RECOGNIZED:"PLAY_RECOGNIZED",
    appIntegrityVersion:"v1",
    appIntegrityCredsPath: "/nfs/vol1/ulpcls/webfile/AppCreds/posrapipayApicreds.json",
}
module.exports=apiStaticData