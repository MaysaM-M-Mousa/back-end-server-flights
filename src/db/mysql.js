const Sequelize = require('sequelize')

const sequelize = new Sequelize(myenv.DB_URL);

module.exports = sequelize 
