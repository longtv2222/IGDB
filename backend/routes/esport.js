const router = require('express').Router();
const esportController = require('../controller/esportController')


/************************ESPORT******************** */
router.get("/", esportController.getAllEsport);

router.post("/", esportController.postAEsport);

router.delete("/:league", esportController.deleteALeague);

module.exports = router;