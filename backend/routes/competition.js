const router = require('express').Router();
const competitionController = require("../controller/competitionController")

/**
 * @swagger
 * /competition/Time_Table/ :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Get all competition time table
 *      parameters :
 *      responses :
 *        200:
 *          description : Get competition time table succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/Time_Table/", competitionController.getAllTimeTable);

/**
 * @swagger
 * /competition/{:cname}/Time_Table/ :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Get all time table for a competition
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *      responses :
 *        200:
 *          description : Get competition time table succesfully
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
router.get("/:cname/Time_Table/", competitionController.getCNameTimeTable);

/**
 * @swagger
 * /competition/{:cname}/Time_Table/ :
 *    delete:
 *      tags:
 *      - "competition"
 *      summary : Delete all time table for a competition
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *      responses :
 *        200:
 *          description : Delete developer succesfully
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
router.delete("/:cname/Time_Table/", competitionController.deleteTimeTable);


/**
 * @swagger
 * /competition/{:cname}/Time_Table/ :
 *    post:
 *      tags:
 *      - "competition"
 *      summary : Get all time table for a competition
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *          - in : body
 *            name : time_table
 *            description : The user to create.
 *            schema :
 *              type: object
 *              required:
 *              - time
 *              - league
 *              properties:
 *                  time:
 *                      type: string
 *                      example : "22/02/2000"
 *                  league:
 *                      type: string
 *                      example : "NA LOL"
 *      responses :
 *        200:
 *          description : Add time table to a competition succesfully
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
router.post("/:cname/Time_Table/", competitionController.postTimeTable);

/**
 * @swagger
 * /competition/clocation_table/ :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Delete all time table for a competition
 *      parameters :
 *      responses :
 *        200:
 *          description : Get all location table succesfully
 *        500:
 *          description : Error occured           
 */
router.get("/clocation_table/", competitionController.getAllLocation);

/**
 * @swagger
 * /competition/:cname/clocation_table/ :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Get all location of a competition
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *      responses :
 *        200:
 *          description : Get all location table succesfully
 *        500:
 *          description : Error occured           
 */
router.get("/:cname/clocation_table/", competitionController.getAllLocationWithCName);

/**
 * @swagger
 * /competition/{:cname}/clocation_table/ :
 *    post:
 *      tags:
 *      - "competition"
 *      summary : Insert location for a league
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *          - in : body
 *            name : location
 *            description : The user to create.
 *            schema :
 *              type: object
 *              required:
 *              - cname
 *              - league
 *              properties:
 *                  cname:
 *                      type: string
 *                      example : "LCS"
 *                  league:
 *                      type: string
 *                      example : "NA LOL"
 *      responses :
 *        200:
 *          description : Insert location table succesfully
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
router.post("/:cname/clocation_table/", competitionController.postLocationWithCName);

/**
 * @swagger
 * /competition/{:cname}/clocation_table/ :
 *    delete:
 *      tags:
 *      - "competition"
 *      summary : Delete location for a league
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *          - in : body
 *            name : location
 *            description : The user to create.
 *            schema :
 *              type: object
 *              required:
 *              - cname
 *              - league
 *              properties:
 *                  cname:
 *                      type: string
 *                      example : "LCS"
 *                  league:
 *                      type: string
 *                      example : "NA LOL"
 *      responses :
 *        200:
 *          description : Delete location table succesfully
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
router.delete("/:cname/clocation_table/", competitionController.deleteLocationWithCName);

/**
 * @swagger
 * /competition/{:cname}/ :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Insert location for a league
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *      responses :
 *        200:
 *          description : Get location of competition succesfully
 *        500:
 *          description : Error occured    
 */
router.get("/:cname", competitionController.getCName);

/**
 * @swagger
 * /competition// :
 *    get:
 *      tags:
 *      - "competition"
 *      summary : Insert location for a league
 *      parameters :
 *          - name : cname
 *            in : path
 *            description : Name of competition
 *            schema :
 *              type : string
 *              example : "NA LOL"
 *      responses :
 *        200:
 *          description : Get all locations of competition succesfully
 *        500:
 *          description : Error occured 
 */ 
router.get("/", competitionController.getAllCname);

/**
 * @swagger
 * /competition/{:cname}/Time_Table/ :
 *    post:
 *      tags:
 *      - "competition"
 *      summary : Insert competition
 *      parameters :
 *          - in : body
 *            name : time_table
 *            description : The user to create.
 *            schema :
 *              type: object
 *              required:
 *              - cname
 *              - league
 *              properties:
 *                  cname:
 *                      type: string
 *                      example : "LCS"
 *                  league:
 *                      type: string
 *                      example : "NA LOL"
 *                  description:
 *                      type: string
 *                      example : "This is a description"
 *      responses :
 *        200:
 *          description : Add time table to a competition succesfully
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
router.post("/", competitionController.postCName);

module.exports = router;
