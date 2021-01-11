const clientController = require('../controller/clientController')
const router = require('express').Router();

/**
 * @swagger
 * /user/paid_user/loginaa:
 *    get:
 *      description : Login into your account
 *      responses :
 *        200:
 *          description : success
 */
router.get("/paid_user/login", clientController.paidUserLogin);

router.post("/paid_user/signup", clientController.paidUserSignUp);

router.get("/paid_user/:id", clientController.getPaidUserByID);

router.get("/paid_user", clientController.getAllPaidUser);

router.delete("/paid_user/:id", clientController.deletePaidUserByID);

router.patch("/paid_user/:id", clientController.updateUsername);

module.exports = router;
