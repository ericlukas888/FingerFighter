const db = require('../models/index');
const User = db.users;
const bot = require("../bot/bot");
const { where } = require('sequelize');

module.exports = {
    async createUser(data) {
        try {
            const existUser = await User.findOne(
                {
                    where: {
                        telegramId: data.id
                    }
                }
            )

            if (existUser) {
                console.error("User already exists.")
                return
            }

            const newUser = {
                telegramId: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                user_name: data.username,
                type: data.type,
                status: true,
            }
            const user = await User.create(newUser);
            console.log("Created New User: ", user);
            return user;
        } catch (error) {
            console.error("Server Error: ", error)
        }
    },

    async setCoutry(req, res) {
        try {
            const { telegramId, country } = req.body;

            const existUser = await User.findOne(
                {
                    where: {
                        telegramId: telegramId
                    }
                }
            );

            if (!existUser) {
                console.error("User does not exist.");
                return res.status(401).json({ message: `User does not exist.` });
            }

            await User.update({ country: country }, {
                where: {
                    telegramId: telegramId
                }
            });

            const user = await User.findOne(
                {
                    where: {
                        telegramId: telegramId
                    }
                }
            );

            console.log("You have successfully set your country");
            return res.status(200).json({ message: 'You have successfully set your country', user: user });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async updateProfile(req, res) {
        try {
            const { telegramId, firstName, lastName, country, walletAddress, image } = req.body;

            const existUser = await User.findOne(
                {
                    where: {
                        telegramId: telegramId
                    }
                }
            );

            if (!existUser) {
                console.error("User does not exist.");
                return res.status(401).json({ message: `User does not exist.` });
            }

            await User.update({ country: country, first_name: firstName, last_name: lastName, walletAddress: walletAddress, image: image }, {
                where: {
                    telegramId: telegramId
                }
            });

            const user = await User.findOne(
                {
                    where: {
                        telegramId: telegramId
                    }
                }
            );

            console.log("Your profile has been updated successfully");
            return res.status(200).json({ message: 'Your profile has been updated successfully', user: user });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    },

    async getUser(req, res) {
        try {
            const telegramId = req.params.telegramId;
            console.log("telegramId", telegramId, typeof (telegramId))

            const existUser = await User.findOne(
                {
                    where: {
                        telegramId: telegramId
                    }
                }
            );

            if (!existUser) {
                console.error("User does not exist.");
                return res.status(401).json({ message: `User does not exist.` });
            }
            return res.status(200).json({ message: 'You have successfully set your country', user: existUser });
        } catch (error) {
            console.error("Server Error: ", error)
            return res.status(500).json({ message: 'Server Error', error: error });
        }
    }


}