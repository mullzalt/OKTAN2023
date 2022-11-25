const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('competition_submission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    theme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mentor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mentor_id_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attachment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'SENT', 'REVIEWED'),
      allowNull: true,
      defaultValue: "PENDING"
    },
    score: {
      type: DataTypes.INTEGER,
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
    tableName: 'competition_submission',
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
        name: "participantId",
        using: "BTREE",
        fields: [
          { name: "participantId" },
        ]
      },
    ]
  });
};
