const express = require("express");
const gameHistoryController = require("../controllers/gameHistory.controller");
const router = express.Router();

router.post('/startGame', gameHistoryController.startGame);
router.post('/endGame', gameHistoryController.endGame);
router.get('/ranking/:gameId/day', gameHistoryController.dailyRanking);
router.get('/ranking/:gameId/week', gameHistoryController.weeklyRanking);
router.get('/ranking/:gameId/month', gameHistoryController.monthlyRanking);

module.exports = router;