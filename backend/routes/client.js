const clientController = require('../controller/clientController')
const router = require('express').Router();




/* ******************* PAID USER OPERATIONS  ******************* */
router.get("/paid_user/login", clientController.paidUserLogin);

router.post("/paid_user/signup", clientController.paidUserSignUp);

router.get("/paid_user/:id", clientController.getPaidUserByID);

router.get("/paid_user", clientController.getAllPaidUser);

router.delete("/paid_user/:id", clientController.deletePaidUserByID);

router.patch("/paid_user/:id", clientController.updateUsername);

/*********************** F2P CLIENT *********************** */
router.get("/f2pclient", clientController.getAllF2P);

router.delete("/f2pclient/:u_id", clientController.deleteF2PByID);

router.post("/f2pclient/", clientController.insertF2PClient);

/* ******************* CLIENT OPERATIONS  ******************* */
router.get("/", clientController.getAllClient);

router.get("/:id", clientController.getClientByID);

router.post("/", clientController.postClient);

router.delete("/:id", clientController.deleteClient);

module.exports = router;
