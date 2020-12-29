const router = require('express').Router();
const teamController = require('../controller/teamController')

/*****************************************EMPLOYS**************** */
router.get("/employs", teamController.getTeamEmployee);

router.get("/:TName/employs", teamController.getTeamEmployeeWithTName);

router.post("/:TName/employs", teamController.postTeamEmploy);

router.delete("/:TName/employs", teamController.deleteTeamEmploy);

////////////////////TEAM///////////////////////
router.get("/:tname", teamController.getTeam);

router.get("/", teamController.getAllTeam);

router.post("/", teamController.postTeam);

router.delete("/:tname", teamController.deleteTeam);


module.exports = router;
