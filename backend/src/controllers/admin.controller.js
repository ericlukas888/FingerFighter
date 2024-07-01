const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = db.admin;
const User = db.users;
const GameHistory = db.gameHistory;
const Game = db.games;
const RewardHistory = db.rewardHistory;
const {where, Sequelize, Op, fn, col } = require('sequelize');
const moment = require('moment');

module.exports = {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            if (email === "" || password === "") {
                console.error("please enter informaion");
                return res.status(401).json({ message: `please enter informaion` });
            }

            const existEmail = await Admin.findOne({
                where: {
                    email: email
                }
            });

            if (existEmail) {
                console.error("Email already exists.");
                return res.status(401).json({ message: `Email already exists.` });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = {
                email: email,
                password: hashedPassword,
                role: "ADMIN",
                status: true
            }

            await Admin.create(newAdmin);
            return res.status(201).json({message: "Admin Created!"});


        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const existUser = await Admin.findOne({
                where: {
                    email: email,
                    status: true
                },
            });

            if (!existUser) {
                return res.status(401).json({ message: `Enter Valid Email`, status: 'Failed' });
            }

            const isPasswordValid = await bcrypt.compare(password, existUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Password Incorrect', status: 'Failed' });
            }

            console.log("existUser", existUser.id)

            const token = jwt.sign({ userId: existUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
            const admin = await Admin.findOne({
                where: {
                    email: email
                },
                attributes: ['id', 'email', 'role'] 
            })

            return res.status(200).json({ message: 'Welcome to Finger Fighter Olympic Game Admin!', token: token, user: admin });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async updatePassword(req, res) {
        try {
            const { userId, opassword, password } = req.body;

            const existAdmin = await Admin.findOne(
                {
                    where: {
                        id: userId,
                    }
                }
            )

            if (!existAdmin) {
                return res.status(401).json({ message: `User don't exists`, status: 'Failed' });
            }

            const isPasswordValid = await bcrypt.compare(opassword, existAdmin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Old Password Incorrect', status: 'Failed' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await Admin.update({ password: hashedPassword }, {
                where: {
                    id: userId,
                }
            });

            res.status(200).json({ message: 'Password updated!' });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    //Users
    async getAllUsers(req, res)  {
        try {
            const users = await User.findAll();

            return res.status(200).json({ message: 'Password updated!', users: users });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async getUserInfo(req, res)  {
        try {
            const {userId} = req.params;

            const user = await User.findOne({
                where: {
                    id: userId
                }
            });

            return res.status(200).json({ message: 'Password updated!', user: user });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },
    
    async updateUser(req, res)  {
        try {
            const {userId, first_name, last_name, user_name, status, walletAddress, country} = req.body;

            const existUser = await User.findOne({
                where: {
                    id: userId
                }
            });

            if (!existUser) {
                return res.status(401).json({message: "User dose not exist."})
            }

            await User.update({first_name: first_name, last_name: last_name, user_name: user_name, status: status, walletAddress: walletAddress, country: country}, {
                where: {
                    id: userId
                }
            });

            const users = User.findAll();

            return res.status(200).json({ message: 'Profile updated!', users: users });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    // Ranking
    
    async dailyRanking(req, res) {
        try {
            const { gameId } = req.params;
            const today = moment().startOf('day');
            const rankings = await GameHistory.findAll({
                attributes: [
                    'userId',
                    [fn('MAX', col('score')), 'maxScore'],
                    'start_date',
                    'updatedAt'
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
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'],
                order: [[fn('MAX', col('score')), 'DESC']]
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
                    'start_date',
                    'updatedAt'
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
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'], // Group by userId and User.id to avoid "column does not exist" error
                order: [[fn('MAX', col('score')), 'DESC']]
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
                    'start_date',
                    'updatedAt'
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
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
                group: ['userId', 'User.id'],
                order: [[fn('MAX', col('score')), 'DESC']]
            });

            return res.status(200).json({ message: 'monthly ranking', ranking: rankings });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    // Game
    async createGame(req, res) {
        try {
            const { name, description, image, status } = req.body;

            const existGame = await Game.findOne({
                where: {
                    name: name
                }
            });

            if(existGame) {
                return res.status(401).json({ message: `This game already exist.` });
            }

            const newGame = {
                name: name,
                description: description,
                image: image,
                status: status
            };

            await Game.create(newGame);

            const games = await Game.findAll();

            return res.status(200).json({ message: 'New Game Created', games: games });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async getGameList(req, res) {
        try {
            const games = await Game.findAll();

            return res.status(200).json({ message: 'Game Lists', games: games });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },
    
    async getGameInfo(req, res) {
        try {
            const {gameId} = req.params;

            const existGame = await Game.findOne({
                where: {
                    id: gameId
                }
            });

            if(!existGame) {
                return res.status(401).json({ message: `Game dose not exist.` });;
            }
            
            return res.status(200).json({ message: 'Game Information', game: existGame });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },
    
    async updateGame(req, res) {
        try {
            const {gameId, name, description, image, status} = req.body;

            const existGame = await Game.findOne({
                where: {
                    id: gameId
                }
            });

            if(!existGame) {
                return res.status(401).json({ message: `Game dose not exist.` });;
            }

            await Game.update({ name: name, description: description, image: image, status: status }, {
                where: {
                    id: gameId
                }
            });

            const games = await Game.findAll();
            return res.status(200).json({ message: 'Game information updated.', games: games });            
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    // Reward

    async getUsersReward(req, res) {
        try {
            const rewards = await RewardHistory.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'telegramId', 'first_name', 'last_name', 'user_name', 'type', 'status', 'walletAddress', 'country'] // specify the attributes you want from the User model
                    }
                ],
            })

            return res.status(200).json({ message: 'Reward History', rewards: rewards });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async provideReward(req, res) {
        try {
            const {userIds, title, amount} = req.body;
            for(const userId of userIds) {
                const newReward = {
                    userId: userId,
                    title: title,
                    amount: amount
                }

                await RewardHistory.create(newReward);
            }

            return res.status(200).json({ message: 'Reward Provided' });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    }
    
}