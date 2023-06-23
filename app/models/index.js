'use strict';

const sequelize = require('../../database/connect');
const Question = require('./Question');
const User = require('./User');

const start = async function () {
    await sequelize.sync({ force: false }).then(() => { }).catch(e => {
        console.log(e);
    });
}

start();

module.exports = {
    Question,
    User
};
