const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('competition', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cover_image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    entry_fee: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM('ISOTERM', 'CRYSTAL'),
      allowNull: true,
      defaultValue: "ISOTERM"
    },
    payment_method: {
      type: DataTypes.ENUM('FREE', 'REQUIRED', 'LATER'),
      allowNull: true,
      defaultValue: "FREE"
    },
    precations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exam_type: {
      type: DataTypes.ENUM('CBT', 'PAPER', 'ABSTRACT'),
      allowNull: true,
      defaultValue: "CBT"
    },
    min_participant: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    max_participant: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    register_due: {
      type: DataTypes.DATE,
      allowNull: true
    },
    register_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'competition',
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
    ]
  });
};
