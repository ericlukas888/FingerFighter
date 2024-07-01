const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const userController = require("../controllers/user.controller");

// Replace with your actual token
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '👆Launch👆',
                        web_app: { url: 'https://finger-fighter-frontend.vercel.app/games' },
                    },
                ],
            ],
        },
    };
    
    const newUser = await userController.createUser(msg.chat);
    bot.sendMessage(newUser.telegramId, `Hello. @${newUser.user_name}. \n🎉Welcome to Finger Fighter!🎉 \nClick "Play" to start.`, opts);
});

module.exports = bot;