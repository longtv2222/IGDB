const router = require('express').Router();
const Video_GameController = require('../controller/Video_GameController')

/**
 * @swagger
 * /Video_Game/operating_platform :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get all compatible operating platforms
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured      
 */
router.get("/operating_platform", Video_GameController.getOS);


/**
 * @swagger
 * /Video_Game/{v_id}/operating_platform :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get all compatible operating platforms of a specified video game
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured      
 */
router.get("/:v_id/operating_platform", Video_GameController.getOSByID);

/**
 * @swagger
 * Video_Game/{v_id}/operating_platform :
 *    post:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Post a new operating platform for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : os
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - platform
 *              properties :
 *                  playername :
 *                      type : string
 *                      example : "Window"
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
router.post("/:v_id/operating_platform", Video_GameController.postOSByID);

/**
 * @swagger
 * Video_Game/{v_id}/operating_platform :
 *    delete:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete an operating platform for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : os
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - platform
 *              properties :
 *                  playername :
 *                      type : string
 *                      example : "Window"
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
router.delete("/:v_id/operating_platform", Video_GameController.deleteOSByID);


/**
 * @swagger
 * Video_Game/Similar_to/:v_id :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get similar games to a specified video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured         
 */
router.get("/Similar_To/:v_id", Video_GameController.getSimilarGame);

/**
 * @swagger
 * Video_Game/Similar_To/{v_id} :
 *    post:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert similar video game to a specified video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - sim_id
 *              properties :
 *                  sim_id :
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
router.post("/Similar_To/:v_id", Video_GameController.postSimilarGame);

/**
 * @swagger
 * Video_Game/Review :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get all reviews for all video games
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/Review", Video_GameController.getAllReviews);

/**
 * @swagger
 * Video_Game/{v_id}/Review :
 *    get:
 *      tags:
 *      - "Video Game"

 *      summary : Get all reviews for a specified video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/:v_id/Review", Video_GameController.getReviewsByUser);

/**
 * @swagger
 * Video_Game/{v_id}/Review :
 *    post:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a review for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : review
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - u_id
 *              - rating
 *              properties :
 *                  u_id :
 *                      type : number
 *                      example : 2
 *                  rating :
 *                      type : number
 *                      example : 5
 *                      description : Rating in scale of 5
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
router.post("/:v_id/Review", Video_GameController.postReviewByUser);

/**
 * @swagger
 * Video_Game/{v_id}/Review :
 *    delete:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delte a review for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : review
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - u_id
 *              properties :
 *                  u_id :
 *                      type : number
 *                      example : 11
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
router.delete("/:v_id/Review", Video_GameController.deleteReviewByUser);

/**
 * @swagger
 * Video_Game/has :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get name of league of a video game
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured       
 */
router.get("/has", Video_GameController.getCompetition);

/**
 * @swagger
 * Video_Game/{v_id}/has :
 *    get:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Get name of league of genre of a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured     
 */
router.get("/:v_id/has", Video_GameController.getCompetitionByGame);

/**
 * @swagger
 * Video_Game/{v_id}/has :
 *    post:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a league for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - league
 *              - genre
 *              properties :
 *                  league :
 *                      type : string
 *                      example : "LOL ESPORT"
 *                  genre :
 *                      type : string
 *                      example : "MOBA"
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
router.post("/:v_id/has", Video_GameController.postCompetitionByGame);

/**
 * @swagger
 * Video_Game/{v_id}/has :
 *    delete:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a league for a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - league
 *              properties :
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
router.delete("/:v_id/has", Video_GameController.deleteCompetitionByGame);

/**
 * @swagger
 * Video_Game/ :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get all games
 *      responses :
 *        200:
 *          description : Succesfully
 *        500:
 *          description : Error occured     
 */
router.get("/", Video_GameController.getAllGame);

/**
 * @swagger
 * Video_Game/{v_id}/Review :
 *    get:
 *      tags:
 *      - "Video Game"
 *      summary : Get a video game by id
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
 * 
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - league
 *              - genre
 *              properties :
 *                  league :
 *                      type : string
 *                      example : "LOL ESPORT"
 *                  genre :
 *                      type : string
 *                      example : "MOBA"
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
router.get("/:v_id", Video_GameController.getGame);

/**
 * @swagger
 * Video_Game/{v_id} :
 *    delete:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Delete a video game
 *      parameters :
 *          - name : v_id 
 *            in : path
 *            schema :
 *                  type : number
 *                  example : 1
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
router.delete("/:v_id", Video_GameController.deleteGame);

/**
 * @swagger
 * Video_Game/ :
 *    post:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Insert a video game
 *      parameters :
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - description
 *              - name
 *              - rs
 *              properties :
 *                  description :
 *                      type : string
 *                      example : "LOL ESPORT"
 *                  name :
 *                      type : string
 *                      example : "MOBA"
 *                  rs :
 *                      type : number
 *                      example : 1
 *                      description : 1 if the game is released to public, 0 if it's not
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
router.post("/", Video_GameController.postGame);

/**
 * @swagger
 * Video_Game/{v_id} :
 *    patch:
 *      tags:
 *      - "Video Game"
 *      security:
 *      - ApiKeyAuth: []
 *      summary : Update release status by game id
 *      parameters :
 *          - name : v_id
 *            in : path
 *            schema  :
 *              type : number
 *              example : 1
 * 
 *          - name : similar video game
 *            in : body
 *            schema :
 *              type : object
 *              required :
 *              - rs
 *              properties :
 *                  rs :
 *                      type : number
 *                      example : 1
 *                      description : 1 if the game is released to public, 0 if it's not
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
router.patch("/:v_id", Video_GameController.updateStatus);

module.exports = router;