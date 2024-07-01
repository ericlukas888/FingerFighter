const Sequelize = require('sequelize');
const dbConfig = require('../configs/db');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  port: dbConfig.port
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.admin = require('./admin.model')(sequelize, Sequelize);
db.users = require('./users.model')(sequelize, Sequelize);
db.games = require('./games.model')(sequelize, Sequelize);
db.gameHistory = require('./gameHistory.model')(sequelize, Sequelize);
db.rewards = require('./rewards.model')(sequelize, Sequelize);
db.rewardHistory = require('./rewardHistory.model')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
