const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('participant', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    allowedToJoin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    team_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mentor_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mentor_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ENROLLED', 'ACTIVE', 'PASSED', 'DISMISSED'),
      allowNull: true,
      defaultValue: "PENDING"
    },
    card_file: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    memberId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'member',
        key: 'id'
      }
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
    tableName: 'participant',
    timestamps: true,
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
        name: "participant_competitionId_memberId_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "memberId" },
          { name: "competitionId" },
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
