const db = require('../models/index');
const GameHistory = db.gameHistory;
const User = db.users;

const bot = require("../bot/bot");
const { where, Sequelize, Op, fn, col } = require('sequelize');
const moment = require('moment');

module.exports = {

    async startGame(req, res) {
        try {
            const { userId, gameId } = req.body;

            const newHistory = {
                userId: userId,
                gameId: gameId,
                score: 0,
                start_date: new Date(),
                status: "STARTED"
            }

            const history = await GameHistory.create(newHistory);
            return res.status(200).json({ message: 'Game started', history: history });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async endGame(req, res) {
        try {
            const { historyId, score } = req.body;

            const existHistory = await GameHistory.findOne({
                where: {
                    id: historyId
                }
            });

            if (!existHistory) {
                return res.status(401).json({ message: `You don't have been started game!` });
            }
    
            if (existHistory.status === "FINISHED") {
                return res.status(401).json({ message: `Game already finished!` });
            }
    
            await GameHistory.update({ score: score, end_date: new Date(), status: "FINISHED" }, {
                where: {
                    id: historyId
                }
            })
            return res.status(200).json({ message: 'Game Finished' });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async dailyRanking(req, res) {
        try {
            const { gameId } = req.params;
            const today = moment().startOf('day');
            const rankings = await GameHistory.findAll({
                attributes: [
                    'userId',
                    [fn('MAX', col('score')), 'maxScore'],
                    [fn('MIN', col('start_date')), 'start_date'],
                    [fn('MAX', col('end_date')), 'updatedAt'],
                ],
                where: {
                    start_date: {
                        [Op.gte]: today.toDate(),
                        [Op.lt]: moment(today).endOf('day').toDate()
                    },
                    gameId: gameId,
                    status: "FINISHED"
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'image', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'],
                order: [[fn('MAX', col('score')), 'DESC']],
                limit: 20
            });

            console.log("dailyRanking", rankings)
            return res.status(200).json({ message: 'daily ranking', ranking: rankings });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async weeklyRanking(req, res) {
        try {
            const { gameId } = req.params;

            const startOfWeek = moment().startOf('isoWeek');
            const endOfWeek = moment().endOf('isoWeek');
            const rankings = await GameHistory.findAll({
                attributes: [
                    'userId',
                    [fn('MAX', col('score')), 'maxScore'],
                    [fn('MIN', col('start_date')), 'start_date'],
                    [fn('MAX', col('end_date')), 'updatedAt'],
                ],
                where: {
                    start_date: {
                        [Op.gte]: startOfWeek.toDate(),
                        [Op.lt]: endOfWeek.toDate()
                    },
                    gameId: gameId,
                    status: "FINISHED"
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'image', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'], // Group by userId and User.id to avoid "column does not exist" error
                order: [[fn('MAX', col('score')), 'DESC']],
                limit: 20
            });

            return res.status(200).json({ message: 'weekly ranking', ranking: rankings });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async monthlyRanking(req, res) {
        try {
            const {gameId} = req.params;
            const startOfMonth = moment().startOf('month');
            const endOfMonth = moment().endOf('month');
            const rankings = await GameHistory.findAll({
                attributes: [
                    'userId',
                    [fn('MAX', col('score')), 'maxScore'],
                    [fn('MIN', col('start_date')), 'start_date'],
                    [fn('MAX', col('end_date')), 'updatedAt'],
                ],
                where: {
                    start_date: {
                        [Op.gte]: startOfMonth.toDate(),
                        [Op.lt]: endOfMonth.toDate()
                    },
                    gameId: gameId,
                    status: "FINISHED"
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'image', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'],
                order: [[fn('MAX', col('score')), 'DESC']],
                limit: 20
            });

            return res.status(200).json({ message: 'monthly ranking', ranking: rankings });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    }

}