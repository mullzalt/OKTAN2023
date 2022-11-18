const db = require("../db")

const Competition = db.sequelize.define("competition", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: db.DataTypes.STRING,
    },
    description: {
        type: db.DataTypes.TEXT,
    },
    cover_image: {
        type: db.DataTypes.TEXT
    },
    entry_fee: {
        type: db.DataTypes.DOUBLE
    },
    category: {
        type: db.DataTypes.ENUM('ISOTERM', 'CRYSTAL'),
        defaultValue: 'ISOTERM'
    },
    payment_method: {
        type: db.DataTypes.ENUM('FREE', 'REQUIRED', 'LATER'),
        defaultValue: 'FREE'
    },
    precations: {
        type: db.DataTypes.TEXT
    },
    exam_type: {
        type: db.DataTypes.ENUM('CBT', 'PAPER', 'ABSTRACT'),
        defaultValue: 'CBT'
    },
    min_participant: {
        type: db.DataTypes.INTEGER,
        defaultValue: 1
    },
    max_participant: {
        type: db.DataTypes.INTEGER,
        defaultValue: 1
    },
    register_due: {
        type: db.DataTypes.DATE
    },
    register_start: {
        type: db.DataTypes.DATE
    },
    start_date: {
        type: db.DataTypes.DATE
    },
    end_date: {
        type: db.DataTypes.DATE
    },
    visible: {
        type: db.DataTypes.BOOLEAN,
        defaultValue: true
    }

},
    {
        freezeTableName: true,
    })


module.exports = Competition