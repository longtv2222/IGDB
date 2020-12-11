const express = require('express')
const router = express.Router();
const Video_GameController = require('../controller/Video_GameController')

/******************OPERATING PLATFORM ****************************/
router.get("/operating_platform", Video_GameController.getOS);

router.get("/:v_id/operating_platform", Video_GameController.getOSByID);

router.post("/:v_id/operating_platform", Video_GameController.postOSByID);

router.delete("/:v_id/operating_platform", Video_GameController.deleteOSByID);

//**********************************************SIMILAR************************************************

router.get("/Similar_To/:v_id", Video_GameController.getSimilarGame);

router.post("/Similar_To/:v_id", Video_GameController.postSimilarGame);

/*****************************************Review**************** */
router.get("/Review", Video_GameController.getAllReviews);

router.get("/:v_id/Review", Video_GameController.getReviewsByUser);

router.post("/:v_id/Review", Video_GameController.postReviewByUser);

router.delete("/:v_id/Review", Video_GameController.deleteReviewByUser);

/*****************************************HAS**************** */
router.get("/has", Video_GameController.getCompetition);

router.get("/:v_id/has", Video_GameController.getCompetitionByGame);

router.post("/:v_id/has", Video_GameController.postCompetitionByGame);

router.delete("/:v_id/has", Video_GameController.deleteCompetitionByGame);

// /************ VIDEO_GAME **************** */
router.get("/", Video_GameController.getAllGame);

router.get("/:v_id", Video_GameController.getGame);

router.delete("/:v_id", Video_GameController.deleteGame);

router.post("/", Video_GameController.postGame);

router.patch("/:v_id", Video_GameController.updateStatus);

module.exports = router;