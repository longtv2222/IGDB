# IGDB

IGDB is an acronym for International Game Database. This project provides a RESTful API services for programmers to do CRUD operations with JSON Object with given game data in the database. IGDB is considered as a 'Wikipedia' so that you can easily search information of everything that involves video games! 

## Built With
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
## Getting Started

### Prerequisite
- Make sure you have [Node.js](https://nodejs.org/) downloaded in your machine.

### Installation
1. Clone the repository:
    ```git clone https://github.com/longtv2222/IGDB.git```
2. Install the Express, Sqlite3, md5 and jsonwebtoken:

    ```npm install express```
    
    ```npm install sqlite3```
    
    ```npm install md5```
    
    ```npm install jsonwebtoken```

### Run the program:
* Make sure that there is no running process on your http://localhost:8000/
* Run the following command inside _backend_ folder:
  
   ``` npm start ```
   
* Navigate to http://localhost:8000/ and you can start using the program

### Usage:
* IGDB provides 2 options for user. If you are a __paid user__, you will have access to view, edit, update and delete information. If you are a __nonpaid user__, the content you view will be restricted to read only.

## License
* This project is licensed under the Apache-2.0 License - see the [LICENSE](https://github.com/longtv2222/IGDB/blob/master/LICENSE) file for more details.
