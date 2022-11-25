const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('team_member', {
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
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    participantId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'participant',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'team_member',
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
        name: "participantId",
        using: "BTREE",
        fields: [
          { name: "participantId" },
        ]
      },
    ]
  });
};
