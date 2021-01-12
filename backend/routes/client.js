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
 *          
 */
router.get("/paid_user/login", clientController.paidUserLogin);

/**
 * @swagger
 * /client/paid_user/signup:
 *    get:
 *      description : Login into your account
 *      parameters :
 *          - name : username
 *            in : body
 *            descripton : name of user
 *            schema :
 *                  type : string
 *                  example : longpro
 * 
 *          - name : password
 *            in : body
 *            description : password of user
 *            schema :
 *              type : string
 *              example : 22222
 *      responses :
 *        200:
 *          description : Login succesfully
 *          
 */
 
router.post("/paid_user/signup", clientController.paidUserSignUp);

router.get("/paid_user/:id", clientController.getPaidUserByID);

router.get("/paid_user", clientController.getAllPaidUser);

router.delete("/paid_user/:id", clientController.deletePaidUserByID);

router.patch("/paid_user/:id", clientController.updateUsername);

module.exports = router;
