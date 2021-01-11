# IGDB

IGDB is an acronym for International Game Database. This project provides a RESTful API services for users to do CRUD operations with JSON with given game data in the database. IGDB is considered as a 'Wikipedia' so that you can easily search information of everything that involves video games! 

## Built With
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [AWS IAM](https://aws.amazon.com/iam/) - Role-based authentication for database
- [AWS RDS](https://aws.amazon.com/rds/) -  DBSM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - User authentication
- [Swagger](https://swagger.io/) -  API Documentation 

## Getting Started

### Prerequisite
- Make sure you have [Node.js](https://nodejs.org/) downloaded in your machine.

### Installation
1. Clone the repository:
    ```git clone https://github.com/longtv2222/IGDB.git```
2. cd into __backend__ folder and install necessary libraries:

    ```npm install```

### Run the program:
* Make sure that there is no running process on your http://localhost:8000/
* Run the following command inside _backend_ folder:
  
   ``` npm start ```
   
* Navigate to http://localhost:8000/ and you can start using the program

### Program Usage with Postman:
* Make sure you have [Postman](https://www.postman.com/downloads/) in your machine.
* IGDB provides 2 options for user. If you are a __paid user__, you will have access to view, edit, update and delete information. If you are a __free user__, the content you view will be restricted to read only.

* To sign up as a paid user, navigate to the following endpoint: http://localhost:8000/client/paid_user/signup and enter the data in body field username and password. This request is considered as a post request.

![ScreenShot](/User_Usage/1.png)

* Navigate to the following endpoint to login http://localhost:8000/client/paid_user/login and enter your username, password you just signed up previously. 

![ScreenShot](/User_Usage/2.png)

* After that there will be a token generated and everytime you make a patch, post or delete request, you should have your token put in the header with the key as token and value is the value generated in the previous image. The following image demonstrates how you should do this.

![ScreenShot](/User_Usage/3.png)

## Documentation
* Please refer to [this document](https://github.com/longtv2222/IGDB/blob/master/User_Usage/Documentation.pdf) for detailed information on all IGDB's endpoints.

## License
* This project is licensed under the Apache-2.0 License - see the [LICENSE](https://github.com/longtv2222/IGDB/blob/master/LICENSE) file for more details.
