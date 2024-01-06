const responseHandlerOperations = require('../../src/commonUtils/responseHandler')

describe("ResponseHandler Test", () => {
    test("ResponseHandler Catch", () => {
        var result = responseHandlerOperations.transform()
        expect(result.apiResponseCode).toEqual("500");
    });
    test("ResponseHandler Success", () => {
        var result = responseHandlerOperations.transform("abc")
        expect(result.apiResponseCode).toEqual("200");
    });
})