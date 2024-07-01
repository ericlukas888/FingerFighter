module.exports = (sequelize, DataTypes) => {
    const Reward = sequelize.define('Reward', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });

    Reward.associate = function(models) {
      Reward.hasMany(models.rewardHistory, { foreignKey: 'rewardId' });
    };
  
    return Reward;
  };