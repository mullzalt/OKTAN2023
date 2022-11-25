const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('invoice', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    total_ammount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bank_customer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bank_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    proof_file: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('UNPAID', 'PENDING', 'REJECTED', 'PAIDOFF'),
      allowNull: true,
      defaultValue: "UNPAID"
    },
    message: {
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
    },
    paymentToId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'bank_account',
        key: 'id'
      }
    },
    bankAccountId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'bank_account',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'invoice',
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
        name: "invoice_competitionId_memberId_unique",
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
      {
        name: "paymentToId",
        using: "BTREE",
        fields: [
          { name: "paymentToId" },
        ]
      },
      {
        name: "bankAccountId",
        using: "BTREE",
        fields: [
          { name: "bankAccountId" },
        ]
      },
    ]
  });
};
