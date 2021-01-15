const router = require('express').Router();
const developerController = require('../controller/developerController')

/**
 * @swagger
 * /developer/{dname} :
 *    get:
 *      tags:
 *      - "developer"
 *      summary : Get developer by name
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Get developer succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/:dname", developerController.getADeveloper);

/**
 * @swagger
 * /developer :
 *    post:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a new developer
 *      parameters :
 *          - name : developer
 *            in : body
 *            description : Name of developer
 *            schema :
 *              type : object
 *              required : dname
 *              properties :
 *                  dname :
 *                      type : string
 *                      example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Insert a new developer succesfully
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
router.post("/", developerController.postADeveloper);

/**
 * @swagger
 * /developer/ :
 *    get:
 *      tags:
 *      - "developer"
 *      summary : Get all developer
 *      responses :
 *        200:
 *          description : Get developers succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/", developerController.getAllDeveloper);

/**
 * @swagger
 * /developer/{dname} :
 *    delete:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a developer
 *      parameters :
 *          - name : developer
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
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
router.delete("/:dname", developerController.deleteADeveloper);


/**
 * @swagger
 * /developer/{dname}/dlocation_table/ :
 *    get:
 *      tags:
 *      - "developer"
 *      summary : Get location of a developer
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Get location succesfully
 *        500:
 *          description : Error occured          
 */
router.get("/:dname/dlocation_table/", developerController.getLocationWithDName);


/**
 * @swagger
 * /developer/{dname}/dlocation_table/ :
 *    post:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert location for a developer
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *          - name : developer
 *            in : body
 *            description : Developer
 *            schema :
 *              type : object
 *              required : location
 *              properties :
 *                  location :
 *                      type : string
 *                      example : "California, US"
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
router.post("/:dname/dlocation_table/", developerController.postLocationWithDName);

/**
 * @swagger
 * /developer/{dname}/dlocation_table/{location} :
 *    delete:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Find specific location for a developer
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *          - name : location
 *            in : path
 *            description : Location of developer
 *            schema :
 *              type : string
 *              example : California, US
 *      responses :
 *        200:
 *          description : Find location of developer succesfully
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
router.delete("/:dname/dlocation_table/:location", developerController.deleteLocation);

/**
 * @swagger
 * /developer/{dname}/develops :
 *    get:
 *      tags:
 *      - "developer"
 *      summary : Get all video games developer develops
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Find location of developer succesfully
 *        500:
 *          description : Error occured         
 */
router.get("/:dname/develops", developerController.getAllVideoGamesWithDName);


/**
 * @swagger
 * /developer/{dname}/develops/{v_id} :
 *    post:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert video game developer developed
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *          - name : v_id
 *            in : path
 *            description : Video games id
 *            schema :
 *              type : number
 *              example : 1
 *      responses :
 *        200:
 *          description : Inserted video game for developer succesfully
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
router.post("/:dname/develops/:v_id", developerController.postADevelop);


/**
 * @swagger
 * /developer/{dname}/develops/{v_id} :
 *    delete:
 *      tags:
 *      - "developer"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete location for a developer
 *      parameters :
 *          - name : dname
 *            in : path
 *            description : Name of developer
 *            schema :
 *              type : string
 *              example : "Ubisoft"
 *          - name : v_id
 *            in : path
 *            description : Video games id
 *            schema :
 *              type : number
 *              example : 1
 *      responses :
 *        200:
 *          description : Find location of developer succesfully
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
router.delete("/:dname/develops/:v_id", developerController.deleteADevelop);

module.exports = router;