const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')
const Token = require('./token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
    }, email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }, dateOfBirth: {
        type: Sequelize.DATEONLY,
        field: 'date_of_birth',
        allowNull: false,
        validate: {
            isDate: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    hooks: {
        beforeCreate: async function (user) {
            user.firstName = user.firstName.toLowerCase()
            user.lastName = user.lastName.toLowerCase()
            user.email = user.email.toLowerCase()
            user.dataValues.id = null
            user.password = await bcrypt.hash(user.password, 8)
        },
        beforeUpdate: async function (user) {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 8)
            }
        }
    }
});