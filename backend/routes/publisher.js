const router = require('express').Router();
const publisherController = require('../controller/publisherController')

/**
 * @swagger
 * /publisher/plocation_table/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get all location of a publisher
 *      responses :
 *        200:
 *          description : Succesful
 *        500:
 *          description : Error occured        
 */
router.get("/plocation_table/", publisherController.getLocation);

/**
 * @swagger
 * /publisher/{pname}/plocation_table/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get all location of a publisher
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Succesful
 *        500:
 *          description : Error occured        
 */
router.get("/:pname/plocation_table/", publisherController.getLocationWithPName);

/**
 * @swagger
 * /publisher/{pname}/plocation_table/ :
 *    post:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post publisher location
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  location : 
 *                      type : string
 *                  example :
 *                      location : "California, US"
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
router.post("/:pname/plocation_table/", publisherController.postLocationWithPName);

/**
 * @swagger
 * /publisher/{pname}/plocation_table/ :
 *    delete:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete publisher location
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  location : 
 *                      type : string
 *                  example :
 *                      location : "California, US"
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
router.delete("/:pname/plocation_table/", publisherController.deleteLocationWithPName);

/**
 * @swagger
 * /publisher/publishes/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get publisher's publishes
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/publishes", publisherController.getAllPublishes);

/**
 * @swagger
 * /publisher/{pname}/publishes/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get a specified publisher's publishes
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured         
 */
router.get("/:pname/publishes", publisherController.getPublishes);

/**
 * @swagger
 * /publisher/{pname}/publishes/ :
 *    post:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post publisher's published video games
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  v_id : 
 *                      type : number
 *                  example :
 *                      v_id : 1
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
router.post("/:pname/publishes", publisherController.postPublishes);

/**
 * @swagger
 * /publisher/{pname}/publishes/ :
 *    delete:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete publisher's published video games
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft" 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  location : 
 *                      type : number
 *                  example :
 *                      v_id : 1
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
router.delete("/:pname/publishes", publisherController.deletePublishes);

/**
 * @swagger
 * /publisher/{pname}/publishes/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get all publisher
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured     
 */
router.get("/", publisherController.getAllPublisher);

/**
 * @swagger
 * /publisher/{pname}/ :
 *    get:
 *      tags:
 *      - "publisher"
 *      summary : Get specified publisher
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/:pname/", publisherController.getPublisher);

/**
 * @swagger
 * /publisher/ :
 *    post:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a new publishers
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  pname : 
 *                      type : string
 *                  example :
 *                      pname : "Ubisoft"
 * 
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
router.post("/", publisherController.postPublisher);

/**
 * @swagger
 * /publisher/{pname}/ :
 *    delete:
 *      tags:
 *      - "publisher"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a publisher
 *      parameters :
 *          - name : pname 
 *            in : path
 *            schema :
 *                  type : string
 *                  example : "Ubisoft"
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
router.delete("/:pname/", publisherController.deletePublisher);

module.exports = router;