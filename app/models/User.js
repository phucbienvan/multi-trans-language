const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/connect');
const jwt = require("jsonwebtoken");
const validator = require('validator');

class User extends Model {
    static async generateAccessToken(id, email) {
        return jwt.sign(
            {
                user: {
                    id: id,
                    email: email,
                }
            },
            'phucbv',
            { expiresIn: "1d" }
        );
    }

    static async toUserResponse(id, username, email) {
        const token = await this.generateAccessToken(id, email);

        return {
            username: username,
            email: email,
            token: token
        }
    }

    static async getUserById(id) {
        return await this.findOne({ where: {id: id} });
    }
};

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
        validate: {
            validator: async function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email format.');
                }

                const existingUser = await this.constructor.findOne({ email: value });
                if (existingUser) {
                    throw new Error('Email already exists.');
                }
            },
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    public_key: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    private_key: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'Users',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

module.exports = User;
