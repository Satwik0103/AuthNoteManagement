Project Auth Note Management

This project comprises two modules:
1 Auth Management
2 Note Management

Technologies Used
Framework: Express.js
Database: MongoDB
Authorization: JWT Token
Testing: Jest (Coverage: 92%)
Rate Limiter: Applied with the following settings:
windowMs: 15 * 60 * 1000 (15 minutes)
max: 100 (limit each IP to 100 requests per windowMs)

Getting Started
API DETAILS
API-SIGN UP 
url-localhost:3039/api/auth/signup
RequestBody-
{
    "username": "Rupeh",
    "userEmail": "rupeh@gmail.com",
    "password": "Rupeh789"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_SIGNUP_PROCESS",
    "apiResponseTime": "2024-01-05 15:58:18",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Sign UP Successful",
        "responseData": {}
    }
}

API-LOGIN
url-localhost:3039/api/auth/login
Request Body-
{
    "userEmail": "mohit@gmail.com",
    "password": "Mohit123"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_undefined",
    "apiResponseTime": "2024-01-05 15:58:02",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Login Successful",
        "responseData": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NTA0ODIsImV4cCI6MTcwNDQ1NDA4Mn0.sqZVR--R-L2j2rnydtWU9hrgFOp74Lv5C29tzss77IU"
        }
    }
}

API-ADD NOTE
url-localhost:3039/api/notes
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Request Body-
{
    "note": "Req Note Updated"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_ADD_NOTE",
    "apiResponseTime": "2024-01-05 15:49:23",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Note Added Successfully",
        "responseData": {}
    }
}

API-SHARE NOTE
url-localhost:3039/api/notes/:id/share
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Request Body-
{
    "userEmail": "satwik@gmail.com"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_SHARE_NOTE",
    "apiResponseTime": "2024-01-05 15:51:10",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Note shared successfully",
        "responseData": {}
    }
}

API-GET ALL NOTE USER
url-localhost:3039/api/notes
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_GET_NOTE",
    "apiResponseTime": "2024-01-05 15:50:04",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Success",
        "responseData": {
            "noteData": [
                {
                    "note": "Have Authenticated request for user",
                    "noteId": "17044429667073593"
                },
                {
                    "note": "Updated the note if authenticate User",
                    "noteId": "17044429963978284"
                },
                {
                    "note": "Req Note Satw",
                    "noteId": "17044499637542032"
                }
            ]
        }
    }
}

API-GET NOTE BY ID
url-localhost:3039/api/notes/:id
Request Parameter-
{
"id":"17044429963978284"
}
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_GET_NOTE_BY_ID",
    "apiResponseTime": "2024-01-05 15:51:37",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Success",
        "responseData": {
            "noteId": "17044429963978284",
            "note": "Updated the note if authenticate User"
        }
    }
}

API-UPDATE NOTE BY ID
url-localhost:3039/api/notes/:id
{
"id":"17044429963978284"
}
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Request Body-
{
    "note": "Updated the note if authenticate User"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_UPDATE_NOTE_BY_ID",
    "apiResponseTime": "2024-01-05 15:53:20",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Note Updated successfully",
        "responseData": {}
    }
}

API-DELETE NOTE BY ID
url-localhost:3039/api/notes/:id
{
"id":"17044429963978284"
}
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_DELETE_NOTE_BY_ID",
    "apiResponseTime": "2024-01-05 15:53:34",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Note Deleted Successfully",
        "responseData": {}
    }
}


API-SEARCH NOTE BY KEYWORD
Request Header-
{
Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NDk5MjUsImV4cCI6MTcwNDQ1MzUyNX0.U3yYDzQqDDl1Fe7ovifHPg6ER44X0dJLw5AcfJbHrDI
}

Request QueryParam-
{
"q":"user"
}
Response-
{
    "apiResponseCode": "200",
    "apiResponseMessage": "Success",
    "apiResponseFrom": "NODE_SEARCH_BY_KEYWORD",
    "apiResponseTime": "2024-01-05 15:52:39",
    "apiResponseData": {
        "responseCode": "200",
        "responseMessage": "Success",
        "responseData": [
            {
                "_id": "6597bc56471ac6b44dbbb8da",
                "note": "Have Authenticated request for user",
                "noteId": "17044429667073593",
                "userEmail": "mohit@gmail.com",
                "sharedEmail": [],
                "createdOn": "2024-01-05 13:52:46"
            },
            {
                "_id": "6597bc74471ac6b44dbbb8db",
                "note": "Updated the note if authenticate User",
                "noteId": "17044429963978284",
                "userEmail": "mohit@gmail.com",
                "sharedEmail": [],
                "createdOn": "2024-01-05 13:53:16",
                "modifiedOn": "2024-01-05 15:18:44"
            }
        ]
    }
}
