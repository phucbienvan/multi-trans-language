const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/connect');

class Question extends Model { };

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question: {
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

module.exports = Question;
