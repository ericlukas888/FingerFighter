module.exports = (sequelize, DataTypes) => {
    const GameHistory = sequelize.define('GameHistory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
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
    });

    GameHistory.associate = models => {
        GameHistory.belongsTo(models.users, { foreignKey: 'userId' });
    };

    return GameHistory;
};