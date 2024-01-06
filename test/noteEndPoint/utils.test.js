const utilsOperation=require("../../src/noteEndPoint/utils")
const apiStaticData=require("../../src/noteEndPoint/apiStaticData")
const utility = require('../../src/commonUtils/utility'); 
const Mongocon = require('../../db/Connector'); 

describe('authutils', () => {
    test("CheckMailId Failure", () => {
        var result = utilsOperation.checkMailId("test")
        expect(result).toBe(false);
    });
    test("CheckMailId Success", () => {
        var result = utilsOperation.checkMailId("test@gmail.com")
        expect(result).toBe(true);
    });
    test("CheckMailId Catch", () => {
        var result = utilsOperation.checkMailId(1)
        expect(result).toBe(false);
    });
    test('Invalid User response create note api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
          body: {
           note:"Hello"
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue(null), 
              insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
            }),
          };
    
          jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
          jest.spyOn(utility, 'convertDatetime').mockReturnValue('2023-01-01T00:00:00.000Z');
        const result = await utilsOperation.createNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.userDoesNotExist,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalled();
        jest.restoreAllMocks();
    });
    test('Catch Block response create note api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
          body: {
           note:"Hello"
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue(null),
              insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
            }),
          };
          let findOneNew = jest.fn(() => {
            return{ _id: objId};
        })
        authDb.collection("").findOne = findOneNew;
          jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
          jest.spyOn(utility, 'convertDatetime').mockReturnValue('2023-01-01T00:00:00.000Z');
        const result = await utilsOperation.createNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalled();
        jest.restoreAllMocks();
    });        
    test('Success response create note api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
          body: {
           note:"Hello"
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue(null), 
              insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
            }),
          };
          let findOneNew = jest.fn(() => {
            return{ userEmail: 'test@example.com'};
        })
        authDb.collection("").findOne = findOneNew;
          jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
          jest.spyOn(utility, 'convertDatetime').mockReturnValue('2023-01-01T00:00:00.000Z');
        const result = await utilsOperation.createNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noteMessage,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalled();
        jest.restoreAllMocks();
    });  
    test('Catch Block get notes Api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
          aggregate: jest.fn(() => ({
            toArray: jest.fn(() => []),
          })),
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.getNotes(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      });
      test('Case-No note found get notes Api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => []),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotes(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noNoteFound,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      });
      test('Case-Success get notes Api', async () => {
        const req = {
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => [{"note":"Hello",noteId:"1"}]),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotes(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.Success,
          responseData: {noteData:[{note:'Hello',noteId:"1"}]},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      });
      test('Catch Block Get Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => []),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotesById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
      test('Case-No Data Found Get Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => null),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotesById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noNoteFound,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('Case-Success Data Found Get Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => ({
                    noteId: 'testNoteId',
                    note: 'Test Note Content',
                    userEmail: 'test@example.com',
                    sharedEmail: [],
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotesById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.Success,
          responseData: { "note": "Test Note Content","noteId": "testNoteId"},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('Case-Invalid note  Found Get Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'dummy@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => ({
                    noteId: 'testNoteId',
                    note: 'Test Note Content',
                    userEmail: 'test@example.com',
                    sharedEmail: [],
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.getNotesById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.invalidNote,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('Catch Block Update Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => []),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
      test('Case-No Data Found Update Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => null),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noNoteFound,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('returns note already updated', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
          body: {
            note: 'Test Note Content',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({
            noteId: 'testNoteId',
            note: 'Test Note Content',
            userEmail: 'test@example.com',
            sharedEmail: [],
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 0,
          })),
        }),
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.noteAlreadyUpdated,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      }); 
      test('returns note updated successfully', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
          body: {
            note: 'Updated Note Content',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
            collection: jest.fn().mockReturnValue({
              findOne: jest.fn(() => ({
                noteId: 'testNoteId',
                note: 'Test Note Content',
                userEmail: 'test@example.com',
                sharedEmail: [],
              })),
              updateOne: jest.fn(() => ({
                modifiedCount: 1,
              })),
            }),
            };
            jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noteUpdatedSuccess,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      });
      test('returns note can not be updated ', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
          body: {
            note: 'Updated Note Content',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
            collection: jest.fn().mockReturnValue({
              findOne: jest.fn(() => ({
                noteId: 'testNoteId',
                note: 'Test Note Content',
                userEmail: 'test@example.com',
                sharedEmail: [],
              })),
              updateOne: jest.fn(() => ({
                modifiedCount: 0,
              })),
            }),
            };
            jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.updateNoteFailue,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        jest.restoreAllMocks();
      });   
      test('Case-Invalid note Found Update Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'dummy@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => ({
                    noteId: 'testNoteId',
                    note: 'Test Note Content',
                    userEmail: 'test@example.com',
                    sharedEmail: [],
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.updateNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.invalidNote,
          responseData: {},
        });
        expect(Mongocon.LoginDB).toHaveBeenCalled();
      });
      test('Catch Block Delete Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => []),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.deleteNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
      test('Case-No Data Found Delete Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => null),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.deleteNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noNoteFound,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      }); 
    test('returns delete note success', async () => {
        // Add a test case for the scenario where the note is deleted successfully

        const req = {
        params: {
            id: 'testNoteId',
        },
        user: {
            userEmail: 'test@example.com',
        },
        };

        const res = {};
    
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
        findOne: jest.fn(() => ({
            noteId: 'testNoteId',
            userEmail: 'test@example.com',
            sharedEmail: [],
        })),
        deleteOne: jest.fn(() => ({
            deletedCount: 1,
        })),
        })
        };

        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);

        const result = await utilsOperation.deleteNoteById(req, res);

        expect(result).toEqual({
        responseCode: apiStaticData.responseCode.Success,
        responseMessage: apiStaticData.responseMessage.deleteNote,
        responseData: {},
        });

        expect(Mongocon.LoginDB).toHaveBeenCalled();
    });
    test('returns note can not be deleted', async () => {
        // Add a test case for the scenario where the note is deleted successfully

        const req = {
        params: {
            id: 'testNoteId',
        },
        user: {
            userEmail: 'test@example.com',
        },
        };

        const res = {};
    
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
        findOne: jest.fn(() => ({
            noteId: 'testNoteId',
            userEmail: 'test@example.com',
            sharedEmail: [],
        })),
        deleteOne: jest.fn(() => ({
            deletedCount: 0,
        })),
        })
        };

        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);

        const result = await utilsOperation.deleteNoteById(req, res);

        expect(result).toEqual({
        responseCode: apiStaticData.responseCode.Failure,
        responseMessage: apiStaticData.responseMessage.deleteNoteFailue,
        responseData: {},
        });

        expect(Mongocon.LoginDB).toHaveBeenCalled();
    });
      test('Case-Invalid note  Found Delete Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'dummy@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => ({
                    noteId: 'testNoteId',
                    note: 'Test Note Content',
                    userEmail: 'test@example.com',
                    sharedEmail: [],
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.deleteNoteById(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.invalidNote,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('Catch Block Share Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                aggregate: jest.fn(() => ({
                    toArray: jest.fn(() => []),
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.shareNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
      test('Case-No Data Found Share Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => null),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.shareNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noNoteFound,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
        jest.restoreAllMocks();
      });
      test('returns note shared success', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
          body: {
            userEmail: 'share@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({
            noteId: 'testNoteId',
            userEmail: 'test@example.com',
            sharedEmail: ['test2gmail.com'],
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 1,
          })),
        })
        };
    
        const mockUserDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({
            userEmail: 'share@example.com',
            sharedEmail: ['test@example.com']
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 1,
          })),
        })
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockUserDbCollection);
    
        const result = await utilsOperation.shareNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.noteSharedSuccess,
          responseData: {},
        });
      });
      test('returns failure in sharing notes ', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'test@example.com',
          },
          body: {
            userEmail: 'share@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({
            noteId: 'testNoteId',
            userEmail: 'test@example.com',
            sharedEmail: ['test2gmail.com'],
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 1,
          })),
        })
        };
    
        const mockUserDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({
            userEmail: 'share@example.com',
            sharedEmail: ['test@example.com']
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 0,
          })),
        })
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockUserDbCollection);
    
        const result = await utilsOperation.shareNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.failureSharing,
          responseData: {},
        });
      });
      test('Case-Invalid note  Found Share Note By ID API', async () => {
        const req = {
          params: {
            id: 'testNoteId',
          },
          user: {
            userEmail: 'dummy@example.com',
          },
        };
    
        const res = {};
    
        const authDb = {
            collection: jest.fn().mockReturnValue({
                findOne: jest.fn(() => ({
                    noteId: 'testNoteId',
                    note: 'Test Note Content',
                    userEmail: 'test@example.com',
                    sharedEmail: [],
                  })),
            }),
          };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
    
        const result = await utilsOperation.shareNote(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.invalidNote,
          responseData: {},
        });
    
        expect(Mongocon.LoginDB).toHaveBeenCalled();
        expect(authDb.collection().findOne).toHaveBeenCalledWith({
          noteId: 'testNoteId',
        });
      });
      test('returns data does not exist', async () => {
        const req = {
          query: {
            q: 'nonexistent',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          find: jest.fn(() => ({
            toArray: jest.fn(() => []),
          })),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.searchByKeyword(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.dataDoesNotExist,
          responseData: [],
        });
      });
      test('returns success with data', async () => {
        // Add a test case for the scenario where search returns data
    
        const req = {
          query: {
            q: 'existing',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          find: jest.fn(() => ({
            toArray: jest.fn(() => [
              { noteId: '1', note: 'Existing Note 1' },
              { noteId: '2', note: 'Existing Note 2' },
            ]),
          })),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.searchByKeyword(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.Success,
          responseData: [
            { noteId: '1', note: 'Existing Note 1' },
            { noteId: '2', note: 'Existing Note 2' },
          ],
        });
      });
      test('handles error', async () => {
        // Add a test case for the scenario where an error occurs during the search
    
        const req = {
          query: {
            q: 'error',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          find: jest.fn(() => {
            throw new Error('Test error');
          }),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.searchByKeyword(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
});