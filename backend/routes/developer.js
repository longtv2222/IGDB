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

router.delete("/:dname/dlocation_table/:location", developerController.deleteLocation);



router.get("/:dname/develops", developerController.getAllVideoGamesWithDName);

router.post("/:dname/develops/", developerController.postADevelop);

router.delete("/:dname/develops/", developerController.deleteADevelop);

module.exports = router;