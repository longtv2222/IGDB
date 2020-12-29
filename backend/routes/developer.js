const router = require('express').Router();
const developerController = require('../controller/developerController')



/* **************************DEVELOPER************************************ */

router.get("/:dname", developerController.getADeveloper);

router.post("/", developerController.postADeveloper);

router.get("/", developerController.getAllDeveloper);

router.delete("/:dname", developerController.deleteADeveloper);

// //////////////////////////DLOCATION_TABLE/////////////////////////////////////////

router.get("/:dname/dlocation_table/", developerController.getLocationWithDName);

router.post("/:dname/dlocation_table/", developerController.postLocationWithDName);

router.delete("/:dname/dlocation_table/:location", developerController.deleteLocation);

// //////////////////////////DEVELOPS/////////////////////////////////////////

router.get("/:dname/develops", developerController.getAllVideoGamesWithDName);

router.post("/:dname/develops/", developerController.postADevelop);

router.delete("/:dname/develops/", developerController.deleteADevelop);

module.exports = router;