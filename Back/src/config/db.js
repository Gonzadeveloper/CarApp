const { Sequelize } = require('sequelize')
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL

const sequelize = new Sequelize( DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false 
        },
    },
});

module.exports = sequelize;