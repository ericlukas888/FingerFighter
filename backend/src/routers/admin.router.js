const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/updatePassword', adminController.updatePassword);
//Users
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/getUserInfo/:userId', adminController.getUserInfo);
router.post('/updateUser', adminController.updateUser);
//Ranking
router.get('/ranking/:gameId/day', adminController.dailyRanking);
router.get('/ranking/:gameId/week', adminController.weeklyRanking);
router.get('/ranking/:gameId/month', adminController.monthlyRanking);
// Games
router.post('/games/createGame', adminController.createGame);
router.get('/games/getGameList', adminController.getGameList);
router.get('/games/getGameInfo/:gameId', adminController.getGameInfo);
router.post('/games/updateGame', adminController.updateGame);
// Rewards
router.get('/rewards/getUsersReward', adminController.getUsersReward);
router.post('/rewards/provideReward', adminController.provideReward);


module.exports = router;