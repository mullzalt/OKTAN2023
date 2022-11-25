const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('competition_sub_theme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    competitionId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'competition',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'competition_sub_theme',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "competitionId",
        using: "BTREE",
        fields: [
          { name: "competitionId" },
        ]
      },
    ]
  });
};
