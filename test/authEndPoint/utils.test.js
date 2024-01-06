
const utilsOperation=require("../../src/authEndPoint/utils")
const apiStaticData=require("../../src/authEndPoint/apiStaticData")
const utility = require('../../src/commonUtils/utility'); // Replace with the actual path to your utility module
const Mongocon = require('../../db/Connector'); // Replace with the actual path to your MongoDB connection module
const jwt = require('jsonwebtoken');
const config = require('../../environment/environmentVar'); // Replace with the actual path to your config module

jest.mock('jsonwebtoken');

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
    test('returns success response for correct credentials', async () => {
        const mockRequest = (userEmail, password) => ({
            body: { userEmail, password },
          });
        const loginData = { userEmail: 'test@example.com', password: 'password123' };
        const req = mockRequest('test@example.com', 'password123');
    
        const result = await utilsOperation.verifyPassword(req, loginData);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.Success,
          responseData: {},
        });
      });   
      test('returns failure response for incorrect credentials', async () => {
        const mockRequest = (userEmail, password) => ({
            body: { userEmail, password },
          });
        const loginData = { userEmail: 'test1@example.com', password: 'password123' };
        const req = mockRequest('dummy@example.com', 'dummy123');
    
        const result = await utilsOperation.verifyPassword(req, loginData);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.credentialsMismatch,
          responseData: {},
        });
      });
    test('creates a new user successfully', async () => {
        const req = {
          body: {
            username: 'newUser',
            userEmail: 'newuser@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => null), // Assume no existing user with the same username or email
          insertOne: jest.fn(() => ({ acknowledged: true })),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.signUpData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.SignUp_successful,
          responseData: {},
        });
      });
      test('handles existing user', async () => {
        // Add a test case where an existing user with the same username or email is found
    
        const req = {
          body: {
            username: 'existingUser',
            userEmail: 'existinguser@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
            collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => ({ username: 'existingUser' })), // Assume an existing user with the same username
          insertOne: jest.fn(),
            })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
    
        const result = await utilsOperation.signUpData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.existingUser,
          responseData: {},
        });
    });
    test('handles error', async () => {
        // Add a test case where an error occurs during the signup process
    
        const req = {
          body: {
            username: 'newUser',
            userEmail: 'newuser@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
            collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => {
            throw new Error('Test error');
          }),
          insertOne: jest.fn(),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
        const result = await utilsOperation.signUpData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
      test('handles unauthorized user login', async () => {
        const req = {
          body: {
            userEmail: 'testuser@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
        collection: jest.fn().mockReturnValue({
            findOne: jest.fn().mockResolvedValue(null), 
        })
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
        const result = await utilsOperation.loginData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.loginFailureStatus,
          responseData: {},
        });
      });      
      test('handles incorrect userId and Password for login', async () => {
        const req = {
          body: {
            userEmail: 'test@example.com',
            password: 'password123',
          },
        };
        const res = {};
        const authDb = {
          collection: jest.fn().mockReturnValue({
            findOne: jest.fn().mockResolvedValue({
              userEmail: 'test@example.com',
              password: 'hashedPassword123',
            }),
          }),
        };
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(authDb);
        utilsOperation.verifyPassword({
          responseCode: apiStaticData.responseCode.Success,
          responseMessage: apiStaticData.responseMessage.Success,
          responseData: {},
        });
        jwt.sign.mockReturnValue('mockedAccessToken');
        const result = await utilsOperation.loginData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.credentialsMismatch,
          responseData: {},
        });
        jest.restoreAllMocks();
      });
      test('handles error', async () => {
        // Add a test case where an error occurs during the signup process
    
        const req = {
          body: {
            username: 'newUser',
            userEmail: 'newuser@example.com',
          },
        };
    
        const res = {};
    
        const mockDbCollection = {
            collection: jest.fn().mockReturnValue({
          findOne: jest.fn(() => {
            throw new Error('Test error');
          }),
          insertOne: jest.fn(),
        })
        };
    
        jest.spyOn(Mongocon, 'LoginDB').mockReturnValue(mockDbCollection);
        const result = await utilsOperation.loginData(req, res);
    
        expect(result).toEqual({
          responseCode: apiStaticData.responseCode.Failure,
          responseMessage: apiStaticData.responseMessage.somethingWentWrong,
          responseData: {},
        });
      });
  });