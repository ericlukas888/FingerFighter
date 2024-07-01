const { where } = require('sequelize');
const db = require('../models/index');
const RewardHistory = db.rewardHistory;

module.exports = {
    async getUserRewards(req, res) {
        try {
            const {userId} = req.params;

            const rewards = await RewardHistory.findAll({
                where: {
                    userId: userId
                }
            });

            return res.status(200).json({ message: 'User Reward History', rewards });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    }
}