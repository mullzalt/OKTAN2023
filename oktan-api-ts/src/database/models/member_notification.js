const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_notification', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    from: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'moderator',
        key: 'id'
      }
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
    },
    about: {
      type: DataTypes.ENUM('MAIN','ENROLLMENT','INVOICE','SUBMISSION'),
      allowNull: true,
      defaultValue: "MAIN"
    },
    type: {
      type: DataTypes.ENUM('DENIED','ACCEPTED','WARNING','NEW'),
      allowNull: true,
      defaultValue: "DENIED"
    }
  }, {
    sequelize,
    tableName: 'member_notification',
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
        name: "from",
        using: "BTREE",
        fields: [
          { name: "from" },
        ]
      },
      {
        name: "memberId",
        using: "BTREE",
        fields: [
          { name: "memberId" },
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
