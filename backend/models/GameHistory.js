const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const GameHistory = sequelize.define('GameHistory', {
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
    // Add other user-related fields here
});

module.exports = GameHistory;