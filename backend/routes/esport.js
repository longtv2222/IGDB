const router = require('express').Router();
const esportController = require('../controller/esportController')



/**
 * @swagger
 * /esport :
 *    get:
 *      tags:
 *      - "esport"
 *      summary : Get all esports
 *      responses :
 *        200:
 *          description : Get all esports succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/", esportController.getAllEsport);

/**
 * @swagger
 * /esport :
 *    post:
 *      tags:
 *      - "esport"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert an esport
 *      requestBody :
 *          content:
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties :
 *                  league :
 *                      type : string
 *                  example : 
 *                      league : "League of Legend Esport"
 *      responses :
 *        200:
 *          description : Insert esport succesfully
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
router.post("/", esportController.postAEsport);

/**
 * @swagger
 * /esport/{league} :
 *    delete:
 *      tags:
 *      - "esport"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete an esport
 *      parameters :
 *          - name : league
 *            in : path
 *            description : the league
 *            schema :
 *              type : string
 *              example : "League of Legend Esport"
 *      responses :
 *        200:
 *          description : Delete specified esport succesfully
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
router.delete('/:league', esportController.deleteALeague);

module.exports = router;