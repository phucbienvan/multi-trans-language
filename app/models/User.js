const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/connect');

class User extends Model { };

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'Questions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

module.exports = User;
