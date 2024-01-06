const loggerOperations = require('../loggers/loggers')

describe("Loggers Test", () => {
    test("Add Note Log", () => {
        var result = loggerOperations.info_addNoteLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("Delete Note By ID Log", () => {
        var result = loggerOperations.info_deleteNoteByIdLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("Get Note By ID Log", () => {
        var result = loggerOperations.info_getNoteByIdLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("Get Note Log", () => {
        var result = loggerOperations.info_getNoteLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("Login Log", () => {
        var result = loggerOperations.info_loginLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("SearchBy Keyword Log", () => {
        var result = loggerOperations.info_searchByKeywordLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("Share Note Log", () => {
        var result = loggerOperations.info_shareNoteLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("SignUp Log", () => {
        var result = loggerOperations.info_signUpLog("12233221112212")
        expect(result).toBe(undefined);
    });
    test("UpdateNoteByIdLog", () => {
        var result = loggerOperations.info_updateNoteByIdLog("12233221112212")
        expect(result).toBe(undefined);
    });
   
})