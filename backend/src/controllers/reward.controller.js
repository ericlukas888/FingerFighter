const { where } = require('sequelize');
const db = require('../models/index');
const Reward = db.rewards;

module.exports = {
    async createReward(req, res) {
        try {
            const {title, amount, score} = req.body;

            const newReward = {
                title: title,
                amount: amount,
                score: score
            }

            const reward = await Reward.create(newReward);
            return res.status(200).json({ message: 'New Reward Created!', reward: reward });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async getAllRewards(req, res) {
        try {
            const {userId} = req.params;
            const rewards = await Reward.findAll({
                
            });

            return res.status(200).json({message: 'All Rewards', rewards: rewards});
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async updateReward(req, res) {
        try {
            const {rewardId, title, amount, score} = req.body;

            const exitReward = await Reward.findOne(
                {
                    where: {
                        id: rewardId
                    }
                }
            );

            if(!exitReward){
                console.error("Reward dose not exist.");
                return res.status(401).json({message: `Reward dose not exist.`});
            }

            await Reward.update({title:title, amount:amount, score:score}, {
                where: {
                    id: rewardId
                }
            });

            return res.status(200).json({message: 'Reward information updated'});
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    }
}