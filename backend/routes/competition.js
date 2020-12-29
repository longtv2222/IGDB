const router = require('express').Router();
const competitionController = require("../controller/competitionController")

//////////////////////////////Time_Table///////////////////////////
router.get("/Time_Table/", competitionController.getAllTimeTable);

router.get("/:cname/Time_Table/", competitionController.getCNameTimeTable);

router.delete("/:cname/Time_Table/", competitionController.deleteTimeTable);

router.post("/:cname/Time_Table/", competitionController.postTimeTable);

/******************************CLOCATION*********************************/
router.get("/clocation_table/", competitionController.getAllLocation);

router.get("/:cname/clocation_table/", competitionController.getAllLocationWithCName);

router.post("/:cname/clocation_table/", competitionController.postLocationWithCName);

router.delete("/:cname/clocation_table/", competitionController.deleteLocationWithCName);
/////////////////////////Competition////////////////////

router.get("/:cname", competitionController.getCName);

router.get("/", competitionController.getAllCname);

router.post("/", competitionController.postCName);

module.exports = router;
