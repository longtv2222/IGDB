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
 * 
 *          - name : player
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - playername
 *              properties :
 *                  playername :
 *                      type : string
 *                      example : "Faker"
 *                  year :
 *                      type : number
 *                      example : 2021
 *                  month :
 *                      type : number
 *                      example : 2
 *                  day :
 *                      type : number
 *                      example : 22
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
 *          - name : player
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - playername
 *              properties :
 *                  playername :
 *                      type : string
 *                      example : "Faker"
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
 *      parameters :
 *          - name : team
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - tname
 *              properties :
 *                  tname :
 *                      type : string
 *                      example : "TSM"
 *                  description :
 *                      type : string   
 *                      example : "TSM is NA team"
 *                  year :
 *                      type : number
 *                      example : 2015
 *                  month : 
 *                      type : number
 *                      example : 22
 *                  day :
 *                      type : number
 *                      example : 2               
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
