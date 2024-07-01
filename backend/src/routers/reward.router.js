const express = require("express");
const rewardController = require("../controllers/rewardHistory.controller");
const router = express.Router();

router.get('/getUserRewards/:userId', rewardController.getUserRewards);

module.exports = router;