// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const TOKEN = '7130412486:AAEARBpugSa4KPiEFg0MjIgVc0VNN0dkFjI';
const GAME_URL = 'https://yourgameurl.com';

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.post(`/${TOKEN}`, (req, res) => {
    const update = req.body;

    if (update.message) {
        const chatId = update.message.chat.id;
        sendGame(chatId);
    }

    res.sendStatus(200);
});

const sendGame = (chatId) => {
    axios.post(`https://api.telegram.org/bot${TOKEN}/sendGame`, {
        chat_id: chatId,
        game_short_name: 'yourgame'
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    setWebhook();
});

const setWebhook = () => {
    axios.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=https://yourdomain.com/${TOKEN}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};
