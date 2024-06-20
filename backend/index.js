const express = require('express');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const User = require('./models/User');
const GameHistory = require('./models/GameHistory');
const sequelize = require('./models/db');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Middleware to parse JSON
app.use(express.json());

// Sync database
sequelize.sync();

// Telegram bot command to display "Play" button
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log("------------", msg.chat)
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Play',
                        web_app: { url: 'https://0462-213-252-244-3.ngrok-free.app/?id=msg.chat.id' },
                    },
                ],
            ],
        },
    };
    saveUser(msg.chat)
    bot.sendMessage(chatId, `Hello. @${msg.chat.username}. \n🎉Welcome to Finger Fighter!🎉 \nClick "Play" to start.`, opts);
});

const saveUser = async (data) => {
    try {
        const existUser = await User.findOne(
            {
                where: {
                    telegramId: data.id
                }
            }
        )

        if (existUser) {
            console.error("User already exists")
            return
        }

        const newUser = {
            telegramId: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.username,
            type: data.type,
            status: true
        }
        const user = await User.create(newUser);
        console.log("Created New User", user);
    } catch (error) {
        console.error("Server Error", error)
    }
}

// Endpoint to handle user data submission
app.post('/api/startGame', async (req, res) => {
    const { telegramId } = req.body;

    try {
        const newHistory = {
            telegramId: telegramId,
            score: 0,
            start_date: new Date(),
            status: "STARTED"
        }
        const history = await GameHistory.create(newHistory);
        res.status(200).json({ message: 'Game Started', history: history });
        console.log("Created New GameHistory", history);
    } catch (error) {
        console.error("Server Error", error)
    }
});

app.post('/api/endGame', async (req, res) => {
    const { historyId, score } = req.body;

    try {
        const existHistory = await GameHistory.findOne({
            where: {
                id: historyId
            }
        })

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
        res.status(200).json({ message: 'Game Finished' });
    } catch (error) {
        console.error("Server Error", error)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});