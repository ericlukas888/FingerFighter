const express = require('express');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const User = require('./models/User');
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
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Play',
                        web_app: { url: 'https://0462-213-252-244-3.ngrok-free.app/' },
                    },
                ],
            ],
        },
    };
    bot.sendMessage(chatId, 'Welcome to Finger Fighter! Click "Play" to start.', opts);
});

// Endpoint to handle user data submission
app.post('/api/users', async (req, res) => {
    const { telegramId, name } = req.body;

    try {
        const user = await User.create({ telegramId, name });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});