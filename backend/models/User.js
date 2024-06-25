const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    walletPrivateKey: {
        type: DataTypes.STRING,
        allowNull: true
    },

    
    // Add other user-related fields here
});

module.exports = User;