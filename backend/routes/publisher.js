const router = require('express').Router();
const publisherController = require('../controller/publisherController')

/******************************PLOCATION*********************************/
router.get("/plocation_table/", publisherController.getLocation);

router.get("/:pname/plocation_table/", publisherController.getLocationWithPName);

router.post("/:pname/plocation_table/", publisherController.postLocationWithPName);

router.delete("/:pname/plocation_table/", publisherController.deleteLocationWithPName);

/*****************************************PUBLISHES**************** */
router.get("/publishes", publisherController.getAllPublishes);

router.get("/:pname/publishes", publisherController.getPublishes);

router.post("/:pname/publishes", publisherController.postPublishes);

router.delete("/:pname/publishes", publisherController.deletePublishes);

// //////////////////////////////////PUBLISHER////////////////////////////////////////////////////////////////////////
router.get("/", publisherController.getAllPublisher);

router.get("/:pname/", publisherController.getPublisher);

router.post("/", publisherController.postPublisher);

router.delete("/:pname/", publisherController.deletePublisher);

module.exports = router;