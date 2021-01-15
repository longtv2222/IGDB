const router = require('express').Router();
const playerController = require('../controller/playerController');

/**
 * @swagger
 * /player/{playername}/participate :
 *    get:
 *      tags:
 *      - "player"
 *      summary : Get list of competitions player participates
 *      parameters :
 *          - name : playername
 *            in : path
 *            description : name of player
 *            example : "Faker"       
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/:playername/participate", playerController.getPlayerParticipate);

/**
 * @swagger
 * /player/:playername/participate/:league/:competitionname :
 *    delete:
 *      tags:
 *      - "player"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete player with competition
 *      parameters :
 *          - name : playername
 *            in : path
 *            description : name of player      
 *            schema :
 *              type : string
 *              example : "Faker"
 *          - name : league
 *            in : path
 *            description : name of league
 *            schema :
 *              type : string
 *              example : "LOL ESPORT"  
 *          - name : competitionname
 *            in : path
 *            description : name of competition
 *            schema :
 *              type : string
 *              example : "NA LCS"    
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
router.delete("/:playername/participate/:league/:competitionname", playerController.deletePlayerParticipate);

/**
 * @swagger
 * /player/:playername/participate/ :
 *    post:
 *      tags:
 *      - "player"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post player's competition
 *      parameters :
 *          - name : playername
 *            in : path
 *            description : name of player      
 *            schema :
 *              type : string
 *              example : "Faker"
 *          - name : league
 *            in : body
 *            description : name of league
 *            schema :
 *              type : object
 *              required : 
 *              - cname
 *              - league :
 *              properties :
 *                  cname : 
 *                      type : string
 *                      example : "NA LCS"
 *                  league : 
 *                      type : string
 *                      example : "LOL ESPORT"   
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
router.post("/:playername/participate/", playerController.postParticipate);

/**
 * @swagger
 * /player/ :
 *    get:
 *      tags:
 *      - "player"
 *      summary : Get all competition of player
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured        
 */
router.get("/", playerController.getAllPlayer);

/**
 * @swagger
 * /player/:playername/ :
 *    get:
 *      tags:
 *      - "player"
 *      summary : Post player's competition
 *      parameters :
 *          - name : playername
 *            in : path
 *            description : name of player      
 *            schema :
 *              type : string
 *              example : "Faker"
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/:playername", playerController.getPlayer);

/**
 * @swagger
 * /player/:playername/ :
 *    delete:
 *      tags:
 *      - "player"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post player's competition
 *      parameters :
 *          - name : playername
 *            in : path
 *            description : name of player      
 *            schema :
 *              type : string
 *              example : "Faker"
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
router.delete("/:playername", playerController.deletePlayer);

/**
 * @swagger
 * /player :
 *    post:
 *      tags:
 *      - "player"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a new player
 *      parameters :
 *          - name : player info
 *            in : body
 *            description : information about player
 *            schema :
 *              type : object
 *              required : 
 *              - playername
 *              properties :
 *                  playername :
 *                      type : string
 *                      example : "Faker"
 *                  age :
 *                      type : number
 *                      example : 22
 *                  nationality :
 *                      type : string
 *                      example : "Korean"
 *                  description :
 *                      type : string
 *                      example : "Faker is a Korean player."
 *                  player_flag :
 *                      type : number 
 *                      example : 1
 *                      description : 1 if player is in a professional team, 0 if not
 *                  org_less_flag :
 *                      type : number 
 *                      example : 0
 *                      description : 1 if player is not in a professional team, 0 if in
 *      responses :
 *        200:
 *          description : Succesful
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
router.post("/", playerController.postPlayer);

module.exports = router;
