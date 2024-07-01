const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/models');
const cors = require('cors');
const bot = require('./src/bot/bot');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routers
const adminRouter = require('./src/routers/admin.router');
const userRouter = require('./src/routers/user.router');
const gameHistoryRouter = require('./src/routers/gameHistory.router');
const rewardRouter = require('./src/routers/reward.router');

app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/gamehistory', gameHistoryRouter);
app.use('/rewards', rewardRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});