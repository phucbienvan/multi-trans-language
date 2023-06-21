require("dotenv").config({
    path: __dirname + "/../../../.env",
    debug: process.env.DEBUG,
});

const {
    DB_CONNECTION,
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
} = process.env;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_CONNECTION,
    logging: false,
});

module.exports = sequelize;
