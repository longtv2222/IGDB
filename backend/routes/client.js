const clientController = require('../controller/clientController')
const router = require('express').Router();

/**
 * @swagger
 * /client/paid_user/login:
 *    get:
 *      description : Login into your account
 *      parameters :
 *          - name : username
 *            in : query
 *            descripton : name of user
 *            schema :
 *                  type : string
 *                  example : longpro
 * 
 *          - name : password
 *            in : query
 *            description : password of user
 *            schema :
 *              type : string
 *              example : 22222
 *      responses :
 *        200:
 *          description : Login succesfully
 *        500:
 *          description : Error occured
 *          
 */
router.get("/paid_user/login", clientController.paidUserLogin);

/**
 * @swagger
 * /client/paid_user/signup:
 *    post:
 *      description : Login into your account
 *      parameters :
 *          - in : body
 *            name : user
 *            description : The user to create.
 *            schema :
 *              type: object
 *              required:
 *              - userName
 *              - password
 *              properties:
 *                  username:
 *                      type: string
 *                      example : "long"
 *                  password:
 *                      type: string
 *                      example : "22222"
 *      responses :
 *        200:
 *          description : Created account succesfully   
 *        500:
 *          description : Error occured      
 */
router.post("/paid_user/signup", clientController.paidUserSignUp);

/**
 * @swagger
 * /client/paid_user/{id} :
 *    get:
 *      description : Get paid user by id
 *      parameters :
 *          - name : id
 *            in : path
 *            description : Paid user id
 *            schema :
 *              type : number
 *              example : 1
 *      responses :
 *        200:
 *          description : Get user succesfully
 *        204:
 *          description : No user returned
 *        500:
 *          description : Error occured
 *          
 */
router.get("/paid_user/:id", clientController.getPaidUserByID);

/**
 * @swagger
 * /client/paid_user/ :
 *    get:
 *      description : Get all paid user
 *      responses :
 *        200:
 *          description : Get all user succesfully
 *        204:
 *          description : No user returned
 *        500:
 *          description : Error occured   
 */
router.get("/paid_user", clientController.getAllPaidUser);

/**
 * @swagger
 * /client/paid_user/{id} :
 *    delete:
 *      description : Get paid user by id
 *      parameters :
 *          - name : token 
 *            in : header
 *            description : paid user token.
 *            schema :
 *              type : string
 *              example : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibG9uZyIsImlkIjoxMiwiaWF0IjoxNjEwNDE4NzY3fQ.eberfpuSHIuPdbr82krqBlOILR406ZZ8ZxfcD5wjiKg"
 * 
 *          - name : id
 *            in : path
 *            description : Paid user id
 *            schema :
 *              type : number
 *              example : 1
 *      responses :
 *        200:
 *          description : Delete user succesfully
 *        500:
 *          description : Error occured
 *          
 */
router.delete("/paid_user/:id", clientController.deletePaidUserByID);

/**
 * @swagger
 * /client/paid_user/{id} :
 *    patch:
 *      description : Update username by id
 *      parameters :
 *          - name : token 
 *            in : header
 *            description : paid user token.
 *            schema :
 *              type : string
 *              example : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibG9uZyIsImlkIjoxMiwiaWF0IjoxNjEwNDE4NzY3fQ.eberfpuSHIuPdbr82krqBlOILR406ZZ8ZxfcD5wjiKg"
 * 
 *          - name : id
 *            in : path
 *            description : Paid user id
 *            schema :
 *              type : number
 *              example : 4
 *              
 *      requestBody : 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type : string
 *                      example:
 *                          username : hello 
 *      responses :
 *        200:
 *          description : Update user succesfully
 *        500:
 *          description : Error occured
 */
router.patch("/paid_user/:id", clientController.updateUsername);

module.exports = router;
