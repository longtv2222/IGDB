const router = require('express').Router();
const teamController = require('../controller/teamController')

/**
 * @swagger
 * /team/employs/ :
 *    get:
 *      tags:
 *      - "team"
 *      summary : Get all players of a team
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured         
 */
router.get("/employs", teamController.getTeamEmployee);

/**
 * @swagger
 * /team/{TName}/employs/ :
 *    get:
 *      tags:
 *      - "team"
 *      summary : Get a specified team's players
 *      parameters :
 *          - name : TName 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "TSM"
 * 
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/:TName/employs", teamController.getTeamEmployeeWithTName);

/**
 * @swagger
 * /team/{TName}/employs :
 *    post:
 *      tags:
 *      - "team"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a new player into a team
 *      parameters :
 *          - name : TName 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "TSM"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  playername : 
 *                      type : string
 *                  year :
 *                      type : number
 *                  month :
 *                      type : number
 *                  day :
 *                      type : number
 *                  example :
 *                      playername : "Faker"
 *                      year : 2021
 *                      month : 22
 *                      day : 22
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured   
 *        401:
 *          description : Error occured 
 *          responseBody :
 *          content :
 *              application/json:
 *                  schema : 
 *                      type : object
 *                      properties :
 *                          message :
 *                              type : string
 *                      example :
 *                          message : "Authentication failed"       
 */
router.post("/:TName/employs", teamController.postTeamEmploy);

/**
 * @swagger
 * /team/{TName}/employs :
 *    delete:
 *      tags:
 *      - "team"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a player inside a team
 *      parameters :
 *          - name : TName 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "TSM"
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  playername : 
 *                      type : string
 *                  example :
 *                      playername : "Faker"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured   
 *        401:
 *          description : Error occured 
 *          responseBody :
 *          content :
 *              application/json:
 *                  schema : 
 *                      type : object
 *                      properties :
 *                          message :
 *                              type : string
 *                      example :
 *                          message : "Authentication failed"       
 */
router.delete("/:TName/employs", teamController.deleteTeamEmploy);

/**
 * @swagger
 * /team/{tname}/ :
 *    get:
 *      tags:
 *      - "team"
 *      summary : Get a specified team
 *      parameters :
 *          - name : tname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "TSM"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/:tname", teamController.getTeam);

/**
 * @swagger
 * /team/ :
 *    get:
 *      tags:
 *      - "team"
 *      summary : Get all teams
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/", teamController.getAllTeam);

/**
 * @swagger
 * /team/ :
 *    post:
 *      tags:
 *      - "team"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post a team   
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  tname : 
 *                      type : string
 *                  description :
 *                      type : string
 *                  year :
 *                      type : number
 *                  month :
 *                      type : number
 *                  day :
 *                      type : number
 *                  example :
 *                      tname : "TSM"
 *                      description : "TSN is a NA team"
 *                      year : 2021
 *                      month : 22
 *                      day : 22          
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured   
 *        401:
 *          description : Error occured 
 *          responseBody :
 *          content :
 *              application/json:
 *                  schema : 
 *                      type : object
 *                      properties :
 *                          message :
 *                              type : string
 *                      example :
 *                          message : "Authentication failed"       
 */
router.post("/", teamController.postTeam);

/**
 * @swagger
 * /team/{tname} :
 *    delete:
 *      tags:
 *      - "team"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a team
 *      parameters :
 *          - name : tname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "TSM"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured   
 *        401:
 *          description : Error occured 
 *          responseBody :
 *          content :
 *              application/json:
 *                  schema : 
 *                      type : object
 *                      properties :
 *                          message :
 *                              type : string
 *                      example :
 *                          message : "Authentication failed"       
 */
router.delete("/:tname", teamController.deleteTeam);


module.exports = router;
