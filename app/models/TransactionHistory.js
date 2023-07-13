const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/connect');

class TransactionHistory extends Model { };

TransactionHistory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    hash_transaction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    from_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'TransactionHistories',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

module.exports = TransactionHistory;
