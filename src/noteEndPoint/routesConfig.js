const express = require("express");
const router = express.Router();
const noteApis = require('./noteEndPoint');
const headerValidation = require("./headerValidation");
const bodyValidation = require("./reqBodyValidation");


router.post("/notes", [
    headerValidation.checkForAuthenticatedUser,
    bodyValidation.validatebodyDataToAddUpdateNote,
    noteApis.addNote
]);
router.get("/notes",[
    headerValidation.checkForAuthenticatedUser,
    noteApis.getNotes
])
router.get("/notes/:id",[
   headerValidation.checkForAuthenticatedUser,
   noteApis.getNoteById
])
router.put("/notes/:id",[
    headerValidation.checkForAuthenticatedUser,
    bodyValidation.validatebodyDataToAddUpdateNote,
    noteApis.updateNoteById
])
router.delete("/notes/:id",[
    headerValidation.checkForAuthenticatedUser,
    noteApis.deleteNoteById
])
router.post("/notes/:id/share", [
    headerValidation.checkForAuthenticatedUser,
    bodyValidation.validateBodyShareNote,
    noteApis.shareNote
    ]);
router.get("/search",[
    headerValidation.checkForAuthenticatedUser,
    noteApis.searchByKeyword,
])
module.exports = router;
