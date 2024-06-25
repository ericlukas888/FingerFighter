const express = require('express');
const axios = require('axios');
const { Sequelize, Op, fn, col } = require('sequelize');
const User = require('./models/User');
const GameHistory = require('./models/GameHistory');
const sequelize = require('./models/db');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const { document } = window;
global.document = document;
global.CustomEvent = window.CustomEvent;
global.window = window;
const cors = require('cors');
const moment = require('moment')
dotenv.config();
const { isWalletInfoRemote, WalletInfoRemote, WalletsListManager, default: TonConnect } = require('@tonconnect/sdk');
const { getWallets } = require('./ton-connect/wallets');
const { TonConnectStorage } = require('./ton-connect/storage');
const QRCode = require('qrcode');
const CustomEvent = require('custom-event');
const TonWeb = require('tonweb');

// Polyfill CustomEvent if not defined (for environments like Node.js)
if (typeof global.CustomEvent !== 'function') {
    global.CustomEvent = CustomEvent;
}

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
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
    saveUser(msg.chat);
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
            status: true,
            walletAddress: "",
            walletPrivateKey: ""
        }
        const user = await User.create(newUser);
        // bot.sendMessage(data.id, `Hello. @${data.username}. \n🎉Welcome to Finger Fighter!🎉 \nClick "Play" to start.`, opts);
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

app.get('/api/rankings/daily', async (req, res) => {
    try {
        const today = moment().startOf('day');
        const rankings = await GameHistory.findAll({
            attributes: [
                'telegramId',
                [fn('MAX', col('score')), 'maxScore'],
                'start_date',
                'end_date'
            ],
            where: {
                start_date: {
                    [Op.gte]: today.toDate(),
                    [Op.lt]: moment(today).endOf('day').toDate()
                }
            },
            group: ['telegramId'],
            order: [[fn('MAX', col('score')), 'DESC']],
            limit: 20
        });
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/rankings/weekly', async (req, res) => {
    try {
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');
        const rankings = await GameHistory.findAll({
            attributes: [
                'telegramId',
                [fn('MAX', col('score')), 'maxScore'],
                'start_date',
                'end_date'
            ],
            where: {
                start_date: {
                    [Op.gte]: startOfWeek.toDate(),
                    [Op.lt]: endOfWeek.toDate()
                }
            },
            group: ['telegramId'],
            order: [[fn('MAX', col('score')), 'DESC']],
            limit: 20
        });
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/rankings/monthly', async (req, res) => {
    try {
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        const rankings = await GameHistory.findAll({
            attributes: [
                'telegramId',
                [fn('MAX', col('score')), 'maxScore'],
                'start_date',
                'end_date'
            ],
            where: {
                start_date: {
                    [Op.gte]: startOfMonth.toDate(),
                    [Op.lt]: endOfMonth.toDate()
                }
            },
            group: ['telegramId'],
            order: [[fn('MAX', col('score')), 'DESC']],
            limit: 20
        });
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});