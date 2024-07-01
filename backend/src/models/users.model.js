module.exports = (sequelize, DataTypes) => {
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
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
        country: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    User.associate = models => {
        User.hasMany(models.gameHistory, { foreignKey: 'userId' });
        User.hasMany(models.rewardHistory, { foreignKey: 'userId' });
    };

    return User;
};