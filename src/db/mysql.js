const Sequelize = require('sequelize')
const myenv = process.env
const sequelize = new Sequelize(myenv.DB_URL);

module.exports = sequelize 
