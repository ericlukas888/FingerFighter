module.exports = (sequelize, DataTypes) => {
  const RewardHistory = sequelize.define('RewardHistory', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  RewardHistory.associate = function (models) {
    RewardHistory.belongsTo(models.users, { foreignKey: 'userId' });
  };

  return RewardHistory;
};