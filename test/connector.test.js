const { connectToServer, LoginDB } = require('../db/Connector'); // Replace with the actual path to your module
const { MongoClient } = require('mongodb');
const config = require('../environment/environmentVar');
const logs = require('../loggers/loggers');

// Mock the MongoDB client
jest.mock('mongodb');

// Mock the logs module
jest.mock('../loggers/loggers');

describe('Mongocon Module', () => {
  // Mock the MongoDB connection
  beforeAll(() => {
    MongoClient.connect.mockImplementation((url, options, callback) => {
      // Simulate a successful connection
      callback(null, {
        db: (dbName) => {
          if (dbName === config.mongo_auth_note_db_name) {
            return 'mockedDB';
          }
          return null;
        },
      });
    });
  });

  // Mock the MongoDB disconnection
  afterAll(() => {
    MongoClient.connect.mockClear();
  });

  describe('connectToServer function', () => {
    test('handles successful connection', async () => {
      await connectToServer('mockedURL');
      expect(logs.info_loginLog).toHaveBeenCalledWith(
        '------ CONNECTED TO MONGO DB URL ---------'
      );
      expect(MongoClient.connect).toHaveBeenCalledWith(
        'mockedURL',
        { useUnifiedTopology: true, useNewUrlParser: true },
        expect.any(Function)
      );
    });

    // Add more test cases for different scenarios...
  });

  describe('LoginDB function', () => {
    test('returns the login database', () => {
      const db = LoginDB();
      expect(db).toBe('mockedDB');
    });

    // Add more test cases for different scenarios...
  });
});
