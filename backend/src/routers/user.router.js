const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post('/setCountry', userController.setCoutry);
router.post('/updateProfile', userController.updateProfile);
router.get('/getUser/:telegramId', userController.getUser);

module.exports = router;