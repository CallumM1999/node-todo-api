# Node-Todo-Api
A REST API for managing tasks built with nodeJS.

## Table of Contents
* [About](#About)
* [Installation](#Installation)



### About
This was one of the projects that I created during a Udemy [NodeJS course](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/overview).

The REST API uses the Express web framework and used MongoDB with Mongoose for data storage.


### Installation
Initialize package manager
```
npm install
```
Setup MongoDB locally, download from [here](https://www.mongodb.com/download-center/community)

Create config file
```
touch server/config/config.json
```
Write the following in the config file:
```
{
    "env": {
        "MONGODB_URI": "mongodb://localhost/notes",
        "PORT": 8080,
        "JWT_SECRET": "ikahbfuhagdoihfoiadgafkl7auudhagsys"
    }
}
```

Start the server.
```
npm run start
```

I suggest using the API via [Postman](https://www.getpostman.com/).