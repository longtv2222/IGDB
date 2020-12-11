const express = require('express')
const router = express.Router();

const playerController = require('../controller/playerController');

/********************************PARTICIPATE************************ */
router.get("/:playername/participate", playerController.getPlayerParticipate);

router.delete("/:playername/participate/:competitionname", playerController.deletePlayerParticipate);

router.post("/:playername/participate/", playerController.postParticipate);

/******************************PLAYER********************* */
router.get("/", playerController.getAllPlayer);

router.get("/:playername", playerController.getPlayer);

router.delete("/:playername", playerController.deletePlayer);

router.post("/", playerController.postPlayer);

module.exports = router;
